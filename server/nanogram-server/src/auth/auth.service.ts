import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { AuthDto, ResetPasswordDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ResetCode } from '.prisma/client';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private mail: MailService) { }

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
            return this.generateToken(user.id, user.email, '30m');
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
            where: {
                username: dto.username
            },
        });

        if (!user) throw new ForbiddenException('Credentials incorrect');

        const password_matches = await argon.verify(user.password, dto.password);

        if (!password_matches) throw new ForbiddenException('Credentials incorrect');


        return this.generateToken(user.id, user.email, '30m');
    }

    async generateToken(Userid: number, email: string, time: string): Promise<{ acess_token: string }> {
        const payload = {
            sub: Userid,
            email
        }
        const secret = process.env.JWT_SECRET;
        const token = await this.jwt.signAsync(payload, {
            expiresIn: time, secret: secret,
        });
        return {
            acess_token: token,
        };


    }

    async requestResetPassword(dto: ResetPasswordDto): Promise<{ acess_token: string }> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new ForbiddenException('Email not registered');

        const token = this.generateToken(user.id, dto.email, '30m');

        const code = Math.floor(Math.random() * 1000000 % 999999);

        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + 30);

        try {
            const user = await this.prisma.resetCode.upsert({
                where : {userEmail: dto.email},
                update: {code: code.toString(), expiration: expiration},
                create: { code: code.toString(), expiration: expiration, userEmail: dto.email}
            });
        } catch (error) {

            throw new ForbiddenException('Error in code generation');

        }

        await this.mail.sendResetPassword(dto.email, code.toString());

        return token;
    }

    async verifyResetCode (dto : ResetCode) {
        return {msg: 'ok'}
    }
}
