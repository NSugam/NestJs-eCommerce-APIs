import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(partial?: Partial<User>) {
        Object.assign(this, partial);
    }
}
