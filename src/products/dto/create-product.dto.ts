import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    title: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsNumber()
    stock: number

    @IsString()
    sku: string
}
