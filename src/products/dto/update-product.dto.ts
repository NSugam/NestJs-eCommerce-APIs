import { PartialType } from '@nestjs/swagger' // use mapped-types
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
