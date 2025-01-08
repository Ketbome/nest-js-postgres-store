import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class Customer {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

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
