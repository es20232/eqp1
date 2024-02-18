import { Global, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';
import { MailModule } from './mail/mail.module';
import { InteractionsModule } from './interactions/interactions.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, MailModule, PostsModule, InteractionsModule],
  controllers: [UsersController],
  providers: [UsersService],
  
})

export class AppModule {}