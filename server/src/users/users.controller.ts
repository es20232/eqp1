import { Req, Body, Controller, Get, Patch, UseInterceptors, UploadedFile, UseGuards, Delete, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { ValidateDto, profile_picDto,usersupdateDto, } from './users_dto';
import { FileTypeValidationPipe } from 'src/images/filevalidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { UserDto } from 'src/auth/dto';
import { JwtStrategy } from 'src/auth/strategy';

const  MAX_FILESIZE=5242000;
@ApiTags('users')
@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    @ApiBearerAuth('acess-token')
    @ApiOperation({summary:'Informações de perfil do usuário logado'})
    @ApiResponse({
        status:200,
        description:'Exibição de informações do usuário',
    })
    getMe(@GetUser('username') username: string,@GetUser('id') id: number) {
        return this.usersService.get(id);
    }
    @UseGuards(AuthGuard('jwt'))
   
    @Patch('edit-profile')
    @ApiBearerAuth('acess-token')
    @ApiOperation({summary:'Edição de dados do perfil de usuário'})
   
    @ApiResponse({
        status:200,
        description:'alteração dos dados fornecidos pelo usuário',
    })
    @ApiExtraModels(usersupdateDto,profile_picDto)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
                type: 'object',
                properties: {
                  full_name: {type:'string'},
                  username: {type:'string'},
                  email: {type:'string'},
                  password:{type:'string'},
    
                  profile_picture: {
                    type: 'string',
                    format: 'binary',
                  },
                },
            },
      })
    
    @UseInterceptors(FileInterceptor('profile_picture'))
    async userUpdate(@GetUser('username') username: string,
    @UploadedFile(new FileTypeValidationPipe(),
    new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILESIZE }),
        ],
      }),
    
    ) image: profile_picDto,@GetUser('id') id: number,@Body() dto:any) {
        const dto_validated=await ValidateDto.sanitizeAndValidate(dto,image);
        return this.usersService.update(dto_validated,id,image);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    @ApiBearerAuth('acess-token')
    @ApiOperation({summary:'Deleção de usuário logado da aplicação'})
    @ApiResponse({
        status:200,
        description:'deleção de todos os dados do usuário logado',
    })
        userDelete(@GetUser('username') username: string,@GetUser('id') id: number){
            return this.usersService.delete(id);
        }
       
    

}