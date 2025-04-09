import { IsInt, IsUUID } from "class-validator";

export class CreateCartDto {
    @IsUUID()
    productId: string
  
    @IsInt()
    qty: number
}
