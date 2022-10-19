import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
// import { ProductsResolver } from './products/products.resolver';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
// import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: 'root',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Product],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UserModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  // providers: [AppService, ProductsResolver],
  // providers: [AppService, AuthService],  readd this
  providers: [AppService],
})
export class AppModule {}
