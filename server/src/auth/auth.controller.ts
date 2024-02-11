import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ResetPasswordDto, UserDto, ResetCodeDto, NewPasswordDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {
    }
    
    @Post('signup')

    @ApiOperation({summary:'Cadastro de novo usuário no Nanogram'})
    @ApiResponse({
        status:201,
        description:'Criação de usuário com sucesso',
    })
    signup(@Body() dto: UserDto) {
        return this.AuthService.signup(dto);
    }

    @Post('signin')

    @ApiOperation({summary:'Login de usuário no Nanogram'})
    @ApiResponse({
        status:201,
        description:'Acesso permitido a conta do usuário',
    })

    signin(@Body() dto: AuthDto) {
        return this.AuthService.signin(dto);
    }

    @Post('reset-password/request')

    @ApiOperation({summary:'Recuperação de senha no Nanogram'})
    @ApiResponse({
        status:201,
        description:'envio de código de recuperação de senha ao e-mail fornecido',
    })
    request(@Body() dto: ResetPasswordDto) {
        return this.AuthService.requestResetPassword(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('reset-password/verify')

    @ApiOperation({summary:'Verificação de autenticidade'})
    @ApiResponse({
        status:201,
        description:'Permissão para alteração de senha',
    })
    verify(@Body() dto: ResetCodeDto, @GetUser() user: { id: number, email: string }) {
        return this.AuthService.verifyResetCode(dto, user);
    }

    @UseGuards(AuthGuard('jwt-rc'))
    @Post('reset-password/update')

    @ApiOperation({summary:'Alteração de senha'})
    @ApiResponse({
        status:201,
        description:'Senha associada ao usuário alterada',
    })
    update(@Body() dto: NewPasswordDto, @GetUser() user: { id: number, userEmail: string }) {
        if (this.AuthService.updatePassword(dto, user)) {
            return {message : "update password"}
        }
    }

}
