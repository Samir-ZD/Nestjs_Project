import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private ProductsRepository: Repository<Product>,
  ) {}

  get(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (err) {
      console.log(err);
    }
  }

  create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto) {
        const password = encodePassword(createUserDto.password);
        const newUser = this.userRepository.create({
          ...createUserDto,
          password,
        });
        return this.userRepository.save(newUser);
      }
      return 'failed';
    } catch (err) {
      console.log('failed');
    }
  }

  update(updateUserDto: UpdateUserDto, userId: number) {
    const password = encodePassword(updateUserDto.password);
    return this.userRepository.update(userId, { ...updateUserDto, password });
  }

  show(userId: number) {
    return this.userRepository.findOne({ where: { userId } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  delete(userId: number) {
    return this.userRepository.delete(userId);
  }

  async addProduct(userId: number, productId: number) {
    const product: Product = await this.ProductsRepository.findOne(productId);
    const user: User = await this.userRepository.findOne(userId, {
      relations: ['products'],
    });
    if (!user.products) {
      user.products = [];
    }
    if (!user.products.find((pruduct) => pruduct.productId == productId)) {
      user.products.push(product);
    }
    return this.userRepository.save(user);
  }

  async getProducts(userId: any): Promise<Product[]> {
    const user: User = await this.userRepository.findOne({
      where: userId,
      relations: ['products'],
    });
    return user.products;
  }
}
