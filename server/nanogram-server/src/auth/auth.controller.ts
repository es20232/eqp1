import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {
    }

    @Post('signup')
    signup () {
        return "OK"
    }

    @Post('signin')
    signin() {
        return "OK"
    }

}
