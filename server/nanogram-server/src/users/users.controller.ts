import { Req, Body, Controller, Get, Patch, UseInterceptors, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { profile_picDto, usersupdateDto, } from './users_dto';
import { FileTypeValidationPipe } from 'src/images/filevalidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@GetUser('username') username: string,@GetUser('id') id: number) {
        return this.usersService.get(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch('editme')
    @UseInterceptors(FileInterceptor('profile_picture'))
    userUpdate(@GetUser('username') username: string,@UploadedFile(new FileTypeValidationPipe()) image: profile_picDto,@GetUser('id') id: number,@Body() dto: usersupdateDto) {
        return this.usersService.update(dto,id,image);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
        userDelete(@GetUser('username') username: string,@GetUser('id') id: number){
            return this.usersService.delete(id);
        }
       
    

}