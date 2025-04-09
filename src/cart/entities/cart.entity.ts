import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User
    
    //eager:true will auto-fetch Product relation when querying Cart
    @ManyToOne(() => Product, { eager: true, nullable: false })
    @JoinColumn({ name: 'productId' })
    product: Product

    @Column({ nullable: true, type: 'int' })
    qty: number

    constructor(partial?: Partial<Cart>) {
        Object.assign(this, partial)
    }
}
