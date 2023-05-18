import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  Is,
  Default,
  ForeignKey,
} from 'sequelize-typescript';
import { Gender } from '../../common/enums/gender';
import { Role } from 'src/common/enums/role';
import { Rank } from 'src/common/enums/rank';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';

@Table({
  tableName: 'Order_Details',
})
export class OrderDetail extends Model<OrderDetail> {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Store)
  @Column({ field: 'store_id' })
  storeId: number;

  @Column({ field: 'total_money' })
  totalMoney: number;

  @Column({ field: 'total_point' })
  totalPoint: number;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
