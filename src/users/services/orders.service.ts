import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'customer'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      newOrder.customer = customer;
    }
    return this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    return this.orderRepo.delete(id);
  }

  async ordersByCustomer(userId: number) {
    const customerId = (
      await this.userRepo.findOne({
        where: { id: userId },
        relations: ['customer'],
      })
    ).customer.id;
    return this.orderRepo.find({
      where: {
        customer: { id: customerId },
      },
      relations: ['items', 'items.product'],
    });
  }
}
