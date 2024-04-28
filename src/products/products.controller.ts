import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ZodValidationPipe } from 'src/flow';
import {
  CreateProductDto,
  CreateProductSchema,
  ReviewDto,
  ReviewSchema,
} from './dto/create-product.dto';
import { AdminAuthGuard, JwtAuthGuard } from 'src/auth/guard';
import { UpdateProductDto, UpdateProductSchema } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post()
  create(
    @Body(new ZodValidationPipe(CreateProductSchema))
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/review')
  review(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ReviewSchema))
    reviewDto: ReviewDto,
  ) {
    return this.productsService.addReview(reviewDto, id);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(UpdateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto, id);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.delete(id);
  }
}
