import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ProfilePicture } from './entities/profile-picture.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileHandlerService {

    constructor(
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,

        @InjectRepository(ProfilePicture)
        private readonly profilePicEntity: Repository<ProfilePicture>,
    ) { }

    async saveProfilePicture(req: any, file: Express.Multer.File, description?: string) {

        const user: any = await this.userEntity.findOne({ where: { username: req.user.username } })
        if (!user) throw new NotFoundException('User not found')

        // Delete old picture from disk if it exists
        if (user.profilePicture) {
            const oldPicture = user.profilePicture;

            const oldPath = path.resolve(oldPicture.path);
            if (fs.existsSync(oldPath))
                fs.unlinkSync(oldPath)

            // Breaking the relation btwn user and profilePic
            user.profilePicture = null;
            await this.userEntity.save(user)

            // then delete
            await this.profilePicEntity.delete(oldPicture.id);
        }

        const picture = this.profilePicEntity.create({
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
            description,
            user
        });
        await this.profilePicEntity.save(picture)

        // Creating the relation btwn user and profilePic
        user.profilePicture = picture
        await this.userEntity.save(user)

    }
}
