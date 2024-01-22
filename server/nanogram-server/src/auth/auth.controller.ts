import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ResetPasswordDto, UserDto, ResetCodeDto, NewPasswordDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator'

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {
    }

    @Post('signup')
    signup(@Body() dto: UserDto) {
        return this.AuthService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.AuthService.signin(dto);
    }

    @Post('reset-password/request')
    request(@Body() dto: ResetPasswordDto) {
        return this.AuthService.requestResetPassword(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('reset-password/verify')
    verify(@Body() dto: ResetCodeDto, @GetUser() user: { id: number, email: string }) {
        return this.AuthService.verifyResetCode(dto, user);
    }

    @UseGuards(AuthGuard('jwt-rc'))
    @Post('reset-password/update')
    update(@Body() dto: NewPasswordDto, @GetUser() user: { id: number, userEmail: string }) {
        this.AuthService.updatePassword(dto, user);
    }

}
