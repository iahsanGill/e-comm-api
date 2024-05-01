import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, ReviewDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product, Review } from './model/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async getOne(id: string) {
    try {
      return await this.productModel.findByPk(id, { include: [Review] });
    } catch (error) {
      throw new BadRequestException('Failed to get the product', {
        cause: error,
      });
    }
  }

  async getAll() {
    try {
      return await this.productModel.findAll();
    } catch (error) {
      throw new BadRequestException('Failed to get the products', {
        cause: error,
      });
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productModel.create(createProductDto);
    } catch (error) {
      throw new BadRequestException('Failed to create the product', {
        cause: error,
      });
    }
  }

  async addReview(reviewDto: ReviewDto, id: string) {
    try {
      // Create a new review and associate it with the product
      await Review.create({ ...reviewDto, productId: id });

      // Find the product by its ID and include its associated reviews
      const product = await this.productModel.findByPk(id, {
        include: [Review],
      });

      // Calculate the updated number of reviews and average rating
      const numReviews = product.reviews.length;
      const totalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      const averageRating = numReviews > 0 ? totalRating / numReviews : 0;

      // Update the product's numReviews and rating fields
      product.numReviews = numReviews;
      product.rating = averageRating;

      // Save the updated product
      await product.save();

      // Return the updated product
      return product;
    } catch (error) {
      throw new BadRequestException('Failed to create the review', {
        cause: error,
      });
    }
  }

  async update(updateProductDto: CreateProductDto, id: string) {
    try {
      return await this.productModel.update(updateProductDto, {
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update the product', {
        cause: error,
      });
    }
  }

  async delete(id: string) {
    try {
      return await this.productModel.destroy({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete the product', {
        cause: error,
      });
    }
  }
}
