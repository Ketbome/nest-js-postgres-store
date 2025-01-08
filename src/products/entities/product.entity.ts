import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'products' })
@Index(['stock', 'price']) // Multiple column index
export class Product {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  //@Index()
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'product_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];

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
