import { Module } from '@nestjs/common';
import { FileHandlerController } from './file-handler.controller';
import { FileHandlerService } from './file-handler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ProfilePicture } from './entities/profile-picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ProfilePicture])],
  controllers: [FileHandlerController],
  providers: [FileHandlerService]
})
export class FileHandlerModule { }
