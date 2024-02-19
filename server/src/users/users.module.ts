import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PostsService } from 'src/posts/posts.service';

@Module({
  controllers:[UsersController],
  providers: [UsersService,PostsService]
})
export class UsersModule {}
