import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, type: 'varchar' })
    title: string;

    @Column({ nullable: false, type: 'varchar' })
    description: string;

    @Column({ nullable: false, type: 'int' })
    price: Number;

    @Column({ nullable: false, type: 'int' })
    stock: Number;

    @Column({ nullable: false, type: 'varchar', unique: true })
    sku: string;

    constructor(partial?: Partial<Product>) {
        Object.assign(this, partial);
    }
}
