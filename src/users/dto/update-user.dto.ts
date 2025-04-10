import { PartialType } from '@nestjs/swagger' // use mapped-types
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
