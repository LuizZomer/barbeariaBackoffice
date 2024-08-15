import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('login')
    async login(@Body() login: AuthLoginDTO){
        return this.authService.login(login)
    }

    @Get('check')
    async check(@Headers('authorization') token: string){
        if (!token) throw new UnauthorizedException("Sem permisão")
            
        const formatedToken = token.split(' ')[1]
        return this.authService.isValidToken(formatedToken)
    }
}
