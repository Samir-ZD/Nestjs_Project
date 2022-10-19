import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId: number;

  @Index({ unique: true })
  @Column({ default: 'name' })
  name: string;

  @Column({ default: 'email' })
  desc: string;

  @Column()
  price: number;
  // @Column({ default: new Date() })
  // product_createdAt: Date;

  @ManyToMany(() => User, (user) => user.products, { nullable: false })
  @JoinTable({ name: 'user__product' })
  users: User[];
}
