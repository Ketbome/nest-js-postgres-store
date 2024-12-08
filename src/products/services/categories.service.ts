import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    return await this.categoryRepo.find({
      relations: ['products'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return await this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoryRepo.merge(category, changes);
    return await this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    await this.categoryRepo.remove(category);
    return true;
  }

  async addCategoryToProduct(categoryId: number, productId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!category || !product) {
      throw new NotFoundException('Category or Product not found');
    }
    if (!product.categories) {
      product.categories = [category];
    }
    product.categories.push(category);
    return await this.productRepo.save(product);
  }
}
