import { z } from 'zod';

// Define Zod schema for Review model
export const ReviewSchema = z.object({
  name: z.string(),
  rating: z.number().min(0).max(5).default(0),
  comment: z.string(),
});

// Define Zod schema for Product model
export const CreateProductSchema = z.object({
  name: z.string(),
  image: z.string().url(), // URL string for image
  brand: z.string(),
  price: z.number().positive(), // Positive number for price
  category: z.string(),
  countInStock: z.number().int().min(0).default(0), // Integer >= 0 for countInStock, default value 0
  description: z.string(),
  rating: z.number().min(0).max(5).default(0), // Integer between 0 and 5 for rating, default value 0
  numReviews: z.number().int().min(0).default(0), // Integer >= 0 for numReviews, default value 0
  reviews: z.array(ReviewSchema).default([]), // Array of ReviewSchema objects, default empty array
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
export type ReviewDto = z.infer<typeof ReviewSchema>;
