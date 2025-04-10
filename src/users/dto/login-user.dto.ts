import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class LoginUserDto {

    @ApiProperty({ example: 'admin@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ example: 'admin123' })
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}