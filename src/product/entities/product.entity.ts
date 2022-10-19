import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
