import { Global, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  
})

export class AppModule {}