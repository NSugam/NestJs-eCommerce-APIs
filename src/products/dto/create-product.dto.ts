import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty({ example: 'test_title' })
    @IsString()
    title: string

    @ApiProperty({ example: 'test_desc' })
    @IsString()
    description: string

    @ApiProperty({ example: 1700 })
    @IsNumber()
    price: number

    @ApiProperty({ example: 50 })
    @IsNumber()
    stock: number

    @ApiProperty({ example: 'test-sku01' })
    @IsString()
    sku: string
}
