import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
// import { ProductsResolver } from './products/products.resolver';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'Test',
      entities: [User, Product],
      synchronize: true,
      // migrationsRun: true,
      // dropSchema: true,
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  // providers: [AppService, ProductsResolver],
  providers: [AppService],
})
export class AppModule {}
