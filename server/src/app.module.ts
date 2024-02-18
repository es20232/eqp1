import { Global, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';
import { MailModule } from './mail/mail.module';
import { InteractionsModule } from './interactions/interactions.module';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, MailModule, PostsModule, InteractionsModule],
  controllers: [UsersController,PostsController],
  providers: [UsersService,PostsService],
  
})

export class AppModule {}