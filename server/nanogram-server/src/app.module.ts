import { Global, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, MailModule],
  controllers: [UsersController],
  providers: [],
  
})

export class AppModule {}