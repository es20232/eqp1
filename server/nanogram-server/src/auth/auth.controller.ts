import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ResetPasswordDto, UserDto } from './dto';
import { ResetCode } from '.prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { User} from './decorator'

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
    verify(@Body() dto: ResetCode, @User('id') id: number) {
        console.log(id);
        return this.AuthService.verifyResetCode(dto);
    }

}
