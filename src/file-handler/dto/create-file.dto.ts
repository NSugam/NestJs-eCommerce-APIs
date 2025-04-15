import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateFileDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string
}
