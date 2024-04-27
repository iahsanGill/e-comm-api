import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
  Default,
  PrimaryKey,
} from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { User } from 'src/user/user.model';

@Table({ timestamps: true })
export class OrderItem extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  qty: number;

  @Column({ allowNull: false })
  image: string;

  @Column({ allowNull: false })
  price: string;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  productId: string;

  @BelongsTo(() => Product)
  product: Product;
}

@Table
export class Order extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @Column({ allowNull: false })
  shippingAddress: string;

  @Column({ allowNull: false })
  shippingCity: string;

  @Column({ allowNull: false })
  shippingPostalCode: string;

  @Column({ allowNull: false })
  shippingCountry: string;

  @Column({ allowNull: false })
  paymentMethod: string;

  @Column
  itemsPrice: number;

  @Column
  taxPrice: number;

  @Column
  shippingPrice: number;

  @Column
  totalPrice: number;

  @Column({ defaultValue: false })
  isPaid: boolean;

  @Column(DataType.DATE)
  paidAt: Date;

  @Column({ defaultValue: false })
  isDelivered: boolean;

  @Column(DataType.DATE)
  deliveredAt: Date;
}
