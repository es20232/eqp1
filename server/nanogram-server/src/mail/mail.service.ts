import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }
    
    async sendResetPassword(email: string, url: string) {
        try {
          let info = await this.mailerService.sendMail({
            to: email,
            from: process.env.USER_EMAIL,
            subject: "Reset Password",
            template: './confirmation.hbs',
            context: { url }
          });
        } catch (error) {
          console.error(`Error sending password reset email: ${error.message}`);
          throw new Error('Failed to send password reset email.');
        }
      }      
}
