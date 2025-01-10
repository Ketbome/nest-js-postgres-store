import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const newOrderItem = new OrderItem();
    if (data.orderId) {
      const order = await this.orderRepo.findOne({
        where: { id: data.orderId },
      });
      newOrderItem.order = order;
    }
    if (data.productId) {
      const product = await this.productRepo.findOne({
        where: { id: data.productId },
      });
      newOrderItem.product = product;
    }
    newOrderItem.quantity = data.quantity;
    return this.orderItemRepo.save(newOrderItem);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOne({
      where: { id },
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem #${id} not found`);
    }
    if (changes.orderId) {
      const order = await this.orderRepo.findOne({
        where: { id: changes.orderId },
      });
      orderItem.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { id: changes.productId },
      });
      orderItem.product = product;
    }
    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }
    return this.orderItemRepo.save(orderItem);
  }
}
