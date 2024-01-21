import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendResetPassword (email: string, url: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Resetar Senha",
            template: './confirmation.hbs',
            context: {url}
        });
    }
}
