import { IsEmail, IsEnum, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    @IsNumber()
    phone: string

    @IsEnum(['admin', 'user'], {
        message: "Valid role required: 'user' or 'admin'"
    })
    role: string
}
