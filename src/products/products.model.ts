import {
  Column,
  Model,
  Table,
  HasMany,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'review_tbl', timestamps: true })
export class Review extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ defaultValue: 0 })
  rating: number;

  @Column({ allowNull: false })
  comment: string;
}

@Table({ tableName: 'product_tbl', underscored: true, timestamps: true })
export class Product extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  image: string;

  @Column({ allowNull: false })
  brand: string;

  @Column({ allowNull: false, defaultValue: 0 })
  price: number;

  @Column({ allowNull: false })
  category: string;

  @Column({ allowNull: false, defaultValue: 0 })
  countInStock: number;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false, defaultValue: 0 })
  rating: number;

  @Column({ allowNull: false, defaultValue: 0 })
  numReviews: number;

  @HasMany(() => Review)
  reviews: Review[];
}
