import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product, Review } from './model/products.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, Review])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
