import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from './../user/user.service';
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()

        const {authorization} = req.headers

        try {
            const data = this.authService.checkToken((authorization ?? '').split(" ")[1])
            
            

            req.tokenPayload = data 

            req.user = await this.userService.findOne(data.id)

            return true
        } catch {
            return false
        }
    }
}