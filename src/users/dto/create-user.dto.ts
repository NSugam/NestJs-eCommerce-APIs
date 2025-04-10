import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsString, IsStrongPassword } from "class-validator";
import { Role } from "./role.enum";

export class CreateUserDto {

    @ApiProperty({ description: 'Unique username', example: "sugamneupane" })
    @IsString()
    username: string

    @ApiProperty({ example: "sugam@gmail.com" })
    @IsEmail()
    email: string

    @ApiProperty({ example: "sugam123" })
    @IsStrongPassword()
    password: string

    @ApiProperty({ example: '9856545588' })
    @IsNumber()
    phone: string

    @ApiProperty({ example: Role.ADMIN })
    @IsEnum(Role, {
        message: "Valid role required: 'user' or 'admin'"
    })
    role: Role
}
