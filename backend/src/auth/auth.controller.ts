import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('login')
    async login(@Body() login: AuthLoginDTO){
        return this.authService.login(login)
    }

    @Post('check')
    async check(){

    }
}
