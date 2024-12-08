import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'int' })
  user: User;

  @Column({ type: 'int' })
  products: Product[];
}
