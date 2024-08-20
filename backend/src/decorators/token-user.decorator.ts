import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

export const UserToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const {authorization} = ctx.switchToHttp().getRequest().headers

    const decoded = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET) 

    return decoded
    
})