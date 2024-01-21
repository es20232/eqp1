import { Global, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD
import { UsersService } from './users/users.service';
=======
import { MailModule } from './mail/mail.module';
>>>>>>> 94668d75687601fcff34338128fc06c4d0c23c6e

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  
})

export class AppModule {}