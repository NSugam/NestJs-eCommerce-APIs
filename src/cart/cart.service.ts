import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private readonly cartEntity: Repository<Cart>,
    private readonly entityManager: EntityManager
  ) { }

  async addToCart(req: any, productData: CreateCartDto) {

    const existingCart = await this.cartEntity.findOne({
      where: {
        user: { id: req.user.id },
        product: { id: productData.productId },
      },
      relations: ['user', 'product'],
    })

    if (!existingCart) {
      const newCart = this.cartEntity.create({
        user: { id: req.user.id },
        product: { id: productData.productId },
        qty: productData.qty,
      });
      await this.cartEntity.save(newCart)
      return { message: 'Product added to cart', success: true }
    }

    existingCart.qty = existingCart.qty + productData.qty
    await this.cartEntity.save(existingCart)
    return { message: "Product quantity updated", success: true }
  }

  async getCartItems(req: any) {
    const userCart = await this.cartEntity.find({
      where: {
        user: { id: req.user.id }
      },
      relations: ['product'],
    })
    return { message: "User Cart Data", success: true, userCart }
  }

  async decreaseQty(req: any, updateCartData: CreateCartDto) {
    const myCart = await this.cartEntity.findOne({
      where: {
        user: { id: req.user.id },
        product: { id: updateCartData.productId },
      },
      relations: ['product'],
    });

    if (!myCart) throw new NotFoundException('Product Not Found');

    if (myCart.qty > updateCartData.qty) {
      myCart.qty -= updateCartData.qty;
      await this.entityManager.save(myCart)

    } else {
      await this.cartEntity.delete(myCart.id)
    }

    return { message: 'Cart updated successfully', success: true };
  }
}
