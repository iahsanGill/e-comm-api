import { Injectable } from '@nestjs/common';
import { CreateProductDto, ReviewDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product, Review } from './model/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async getOne(id: string) {
    return await this.productModel.findByPk(id, { include: [Review] });
  }

  async getAll() {
    return await this.productModel.findAll();
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async addReview(reviewDto: ReviewDto, id: string) {
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
  }

  async update(updateProductDto: CreateProductDto, id: string) {
    return await this.productModel.update(updateProductDto, {
      where: { id },
    });
  }

  async delete(id: string) {
    return await this.productModel.destroy({
      where: { id },
    });
  }
}
