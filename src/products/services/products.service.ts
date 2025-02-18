import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dtos';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand', 'categories'],
        take: limit,
        skip: offset,
        where,
        order: { name: 'ASC' },
      });
    }
    return this.productRepo.find({
      relations: ['brand', 'categories'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOneBy({
        id: data.brandId,
      });
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      newProduct.categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
    }
    return await this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (changes.brandId) {
      const brand = await this.brandRepo.findOneBy({
        id: changes.brandId,
      });
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      product.categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      });
    }
    this.productRepo.merge(product, changes);
    return await this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    await this.productRepo.remove(product);
    return true;
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return await this.productRepo.save(product);
  }
}
