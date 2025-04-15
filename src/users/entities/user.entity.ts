import { ProfilePicture } from "src/file-handler/entities/profile-picture.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, type: 'varchar', unique: true })
    username: string;

    @Column({ nullable: false, type: 'varchar' })
    email: string;

    @Column({ nullable: false, type: 'varchar' })
    password: string;

    @Column({ nullable: false, type: 'varchar' })
    phone: string;

    @Column({ nullable: false, type: 'varchar' })
    role: string;

    @OneToOne(() => ProfilePicture, { cascade: true, eager: true })
    @JoinColumn()
    profilePicture: ProfilePicture;

    constructor(partial?: Partial<User>) {
        Object.assign(this, partial);
    }
}
