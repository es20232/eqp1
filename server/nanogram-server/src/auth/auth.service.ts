import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,private jwt: JwtService) { }

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
            return this.signToken(user.id,user.email);
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

        
        return this.signToken(user.id,user.email);
    }
     async signToken(Userid: number, email: string): Promise<{acess_token:string}>{
           const payload={
            sub:Userid,
            email
           }
           const secret= process.env.JWT_SECRET;
           const token = await this.jwt.signAsync(payload,{
            expiresIn:'30m',secret: secret,
           });
           return{
            acess_token: token,
           };
          

    }
}
