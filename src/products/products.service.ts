import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productEntity: Repository<Product>,
    private readonly entityManager: EntityManager
  ) { }

  async createProduct(productData: CreateProductDto) {
    const existingProduct = await this.productEntity.findOne({ where: { sku: productData.sku } })

    if (existingProduct) throw new ConflictException('Product with similar SKU already exist!')

    const product = new Product(productData)
    await this.entityManager.save(product)
    return { message: 'Product Added Successfully', statusCode: HttpStatus.CREATED, success: true, product }
  }

  async findAll(title?: string) {
    const product = await this.productEntity.find({ where: { title: title } })
    return { message: 'All Product Data', statusCode: HttpStatus.OK, success: true, product }
  }

  async findbyId(id: string) {
    const product = await this.productEntity.findOne({ where: { id: id } })
    if (!product) throw new NotFoundException(`Product with id: ${id} not found`)

    return { message: 'Specific Product Data', statusCode: HttpStatus.OK, success: true, product }
  }

  async updateById(id: string, updateDetails: UpdateProductDto) {
    const product = await this.productEntity.findOne({ where: { id: id } })
    if (!product) throw new NotFoundException(`Product with id: ${id} not found`)

    this.productEntity.merge(product, updateDetails)
    await this.entityManager.save(product)

    return {
      message: "Product details Updated Successfully",
      statusCode: HttpStatus.CREATED, success: true, updateDetails
    }
  }

  async deleteById(id: string) {
    let product = await this.productEntity.delete(id)
    if (!product) throw new NotFoundException(`Product with id: ${id} not found`)

    return { message: "Product Deleted Successfully", statusCode: HttpStatus.CREATED, success: true, product }
  }
}
