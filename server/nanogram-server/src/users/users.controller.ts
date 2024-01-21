import { Req,Body, Controller, Get, Patch, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { profile_picDto, usersupdateDto, } from './users_dto';
import { FileTypeValidationPipe } from 'src/images/filevalidation.pipe';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('me')
    getme(){
    return this.usersService.get();
    }
    
    @Patch('me')
    @UseInterceptors(FileInterceptor('profile_picture'))
    userUpdate(@UploadedFile(new FileTypeValidationPipe()) image: profile_picDto,@Body() dto:usersupdateDto){
     return this.usersService.update(dto,'teste',image);   
    }
   
}