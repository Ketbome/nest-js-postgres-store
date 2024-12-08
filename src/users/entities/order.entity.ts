import { User } from './user.entity';
import { Product } from './../../products/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
}
