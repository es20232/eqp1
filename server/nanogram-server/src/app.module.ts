import { Global, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';
<<<<<<< HEAD
=======
import { MailModule } from './mail/mail.module';
>>>>>>> 5c8513fc34a5287629e6857123182fc7974d5343

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],//, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  
})

export class AppModule {}