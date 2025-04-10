import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('add')
  createProduct(@Body() productData: CreateProductDto) {
    return this.productsService.createProduct(productData);
  }

  @Get('all')
  @ApiQuery({ name: 'title', required: false })
  findAll(@Query('title') title?: string) {
    return this.productsService.findAll(title);
  }

  @Get(':id')
  findbyId(@Param('id') id: string) {
    return this.productsService.findbyId(id);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() updateDetails: UpdateProductDto) {
    return this.productsService.updateById(id, updateDetails);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.productsService.deleteById(id);
  }
}
