import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProfilePicture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: 'varchar' })
    filename: string;

    @Column({ nullable: false, type: 'varchar' })
    path: string;

    @Column({ nullable: false, type: 'varchar' })
    mimetype: string;

    @Column({ nullable: false, type: 'varchar' })
    size: number;

    @Column({ nullable: true, type: 'varchar' })
    description: string;

    @ManyToOne(() => User, user => user.profilePicture)
    user: User;
}
