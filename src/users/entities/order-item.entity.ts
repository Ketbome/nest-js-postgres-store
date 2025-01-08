import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class OrderItem {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id' })
  order: Order;

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
}
