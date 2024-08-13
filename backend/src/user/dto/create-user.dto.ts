import { IsEmail, IsEnum, IsNumber, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0
    })
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    workload: string;

    @IsNumber()
    wage: number

    @IsEnum(Role)
    role: string
}
