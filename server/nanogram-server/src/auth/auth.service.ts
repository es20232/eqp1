import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: UserDto) {
        const hash_password = await argon.hash(dto.password);
        const data = {
            full_name: dto.full_name,
            username: dto.username,
            email: dto.email,
            password: hash_password
        }

        try {
            const user = await this.prisma.user.create({ data });
            delete user.password;
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentianls taken');
                }
            }
            throw error;
        }

    }

    async signin(dto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where:{
                username: dto.username
            },
        });

        if (!user) throw new ForbiddenException('Credentials incorrect');

        const password_matches = await argon.verify(user.password, dto.password);

        if(!password_matches) throw new ForbiddenException('Credentials incorrect');

        delete user.password;
        return user;
    }
}
