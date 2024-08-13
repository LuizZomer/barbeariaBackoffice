import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { AuthLoginDTO } from './dto/auth-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = "user"

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ){}

    createToken(user: User){
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }, {
                expiresIn: '2 days',
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    checkToken(token: string){

        try{
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            }) 

            return data
        }catch(e) {            
            throw new BadRequestException(e)
        }
    }

    isValidToken(token: string){
        try{
            this.checkToken(token)

            return true
        }catch {
            return false
        }
    }

    async login({email, password}: AuthLoginDTO){
        const user = await this.prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!user) throw new NotFoundException('Email e/ou senha incorretos')

        if(!await bcrypt.compare(password, user.password))
            throw new UnauthorizedException('Email e/ou senha incorretos')

        return this.createToken(user)
    }

}
