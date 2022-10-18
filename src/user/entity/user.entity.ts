import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'name' })
  name: string;

  @Index({ unique: true })
  @Column({ default: 'email' })
  email: string;

  @Column({ default: 'password' })
  password: string;
}
