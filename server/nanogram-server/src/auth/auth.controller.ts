import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ResetPasswordDto, UserDto } from './dto';

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
    request(@Body() dto : ResetPasswordDto) {
        return this.AuthService.requestResetPassword(dto);
    }

}
