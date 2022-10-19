/* eslint-disable prettier/prettier */
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(type => Product, product => product.user) // note: we will create author property in the Photo class below
  products: Product[];
}

