/* eslint-disable prettier/prettier */
import { Product } from 'src/product/entities/product.entity';
import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ default: 'name' })
  name: string;
  
  @Column({ default: 'username' })
  username: string;

  @Index({ unique: true })
  @Column({ default: 'email' })
  email: string;

  @Column({ default: 'password' })
  password: string;

  // @CreateDateColumn()
  // createdAt : string

  @ManyToMany(() => Product, (product) => product.users, { nullable: false })
  @JoinTable({ name: 'user__product' })
  products: Product[];



  
}

