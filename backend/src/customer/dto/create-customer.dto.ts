import { IsEmail, IsInt, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateCustomerDTO {

    @IsString()
    name: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 1
    })
    password: string;

    @IsInt()
    @IsOptional()
    loyaltyPoints?: number;

    @IsEmail()
    email: string;
}