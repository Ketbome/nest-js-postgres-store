import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from './../../products/services/products.service';
import { Customer } from '../entities/customer.entity';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}

  async findAll() {
    return await this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return await this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    if (changes.customerId) {
      const customer = await this.customersService.findOne(changes.customerId);
      user.customer = customer;
    }
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.userRepo.remove(user);
    return true;
  }

  /* async getOrderByUser(id: number): Promise<Order> {
    const user = await this.findOne(id);
    return await this.orderRepo.findOne({ user });
  } */
}
