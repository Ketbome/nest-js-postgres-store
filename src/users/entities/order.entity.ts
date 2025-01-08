import {
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
          itemId: item.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity;
          return total + totalItem;
        }, 0);
    }
    return 0;
  }
}
