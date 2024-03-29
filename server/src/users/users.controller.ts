import { Req, Body, Controller, Get, Patch, UseInterceptors, UploadedFile, UseGuards, Delete, ParseFilePipeBuilder, ParseIntPipe, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { ValidateDto, profile_picDto, usersupdateDto, } from './users_dto';
import { FileTypeValidationPipe } from 'src/images/filevalidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/auth/dto';
import { JwtStrategy } from 'src/auth/strategy';
import { PostsService } from 'src/posts/posts.service';

const MAX_FILESIZE = 5242000;
@ApiTags('users')
@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly postsService: PostsService) { }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    @ApiBearerAuth('acess-token')
    @ApiOperation({ summary: 'Informações de perfil do usuário logado' })
    @ApiResponse({
        status: 200,
        description: 'Exibição de informações do usuário',
    })
    getMe(@GetUser('username') username: string, @GetUser('id') id: number) {
        return this.usersService.get(id);
    }
    @UseGuards(AuthGuard('jwt'))

    @Patch('edit-profile')
    @ApiBearerAuth('acess-token')
    @ApiOperation({ summary: 'Edição de dados do perfil de usuário' })

    @ApiResponse({
        status: 200,
        description: 'alteração dos dados fornecidos pelo usuário',
    })
    @ApiExtraModels(usersupdateDto, profile_picDto)
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                full_name: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },

                profile_picture: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })

    @UseInterceptors(FileInterceptor('Profile_picture'))
    async userUpdate(@GetUser('username') username: string,
        @UploadedFile(new FileTypeValidationPipe(),

            new ParseFilePipeBuilder()
                .addMaxSizeValidator({
                    maxSize: MAX_FILESIZE
                })
                .build({
                    fileIsRequired: false
                }),


        ) image: Express.Multer.File, @GetUser('id') id: number, @Body() dto: any) {
        const dto_validated = await ValidateDto.sanitizeAndValidate(dto, image);
        return this.usersService.update(dto_validated, id, image);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    @ApiBearerAuth('acess-token')
    @ApiOperation({ summary: 'Deleção de usuário logado da aplicação' })
    @ApiResponse({
        status: 200,
        description: 'deleção de todos os dados do usuário logado',
    })
    userDelete(@GetUser('username') username: string, @GetUser('id') id: number) {
        return this.usersService.delete(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('list')
    @ApiBearerAuth('acess-token')
    @ApiOperation({ summary: 'Listar todos os usuários da aplicação' })
    @ApiResponse({
        status: 200,
        description: 'listagem de todos os usuários da aplicação',
    })
    findAll() {
        return this.usersService.findAll();
    }

     @Get(':id')
      getUser(@Param('id',ParseIntPipe) id:number,){
           return this.usersService.get(id);
           
      } 

}