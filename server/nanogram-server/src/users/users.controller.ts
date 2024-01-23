import { Req, Body, Controller, Get, Patch, UseInterceptors, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { profile_picDto, usersupdateDto, } from './users_dto';
import { FileTypeValidationPipe } from 'src/images/filevalidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/auth/dto';
import { JwtStrategy } from 'src/auth/strategy';
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(AuthGuard('jwt'))
    @Get('me')

    @ApiOperation({summary:'Informações de perfil do usuário logado'})
    @ApiResponse({
        status:200,
        description:'Exibição de informações do usuário',
    })
    getMe(@GetUser('username') username: string,@GetUser('id') id: number) {
        return this.usersService.get(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch('me')
    @ApiOperation({summary:'Edição de dados do perfil de usuário'})
    @ApiResponse({
        status:200,
        description:'alteração dos dados fornecidos pelo usuário',
    })

    @UseInterceptors(FileInterceptor('profile_picture'))
    userUpdate(@GetUser('username') username: string,@UploadedFile(new FileTypeValidationPipe()) image: profile_picDto,@GetUser('id') id: number,@Body() dto: usersupdateDto) {
        return this.usersService.update(dto,id,image);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
     
    @ApiOperation({summary:'Deleção de usuário logado da aplicação'})
    @ApiResponse({
        status:200,
        description:'deleção de todos os dados do usuário logado',
    })
        userDelete(@GetUser('username') username: string,@GetUser('id') id: number){
            return this.usersService.delete(id);
        }
       
    

}