import {
  Column,
  Model,
  Table,
  Unique,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';

@Table({ timestamps: true, tableName: 'user_tbl', underscored: true })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Unique
  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false, defaultValue: false })
  isAdmin: boolean;
}
