import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsUUID } from "class-validator";

export class CreateCartDto {

    @ApiProperty()
    @IsUUID()
    productId: string

    @ApiProperty()
    @IsInt()
    qty: number
}
