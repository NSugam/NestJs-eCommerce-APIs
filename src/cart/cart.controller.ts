import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  addToCart(@Req() req: any, @Body() productData: CreateCartDto) {
    return this.cartService.addToCart(req, productData)
  }

  @Get()
  getCartItems(@Req() req: any) {
    return this.cartService.getCartItems(req);
  }

  @Patch('--qty')
  decreaseQty(@Req() req: any, @Body() updateCartData: CreateCartDto) {
    return this.cartService.decreaseQty(req, updateCartData)
  }
}
