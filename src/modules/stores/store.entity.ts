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
  BelongsToMany,
} from 'sequelize-typescript';
import { Gender } from '../../common/enums/gender';
import { Role } from 'src/common/enums/role';
import { Rank } from 'src/common/enums/rank';
import { Reward } from '../rewards/reward.entity';
import { TypePoint } from 'src/common/enums/typePoint';
import { FLOAT } from 'sequelize';
import { User } from '../users/user.entity';
import { OrderDetail } from '../order_details/order_details.entity';

@Table({
  tableName: 'Stores',
})
export class Store extends Model<Store> {
  @HasMany(() => Reward)
  rewards: Reward[];

  @BelongsToMany(() => User, () => OrderDetail)
  users: User[];

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  name: string;

  @Column({
    field: 'type_point',
    type: DataType.ENUM(TypePoint.fixed, TypePoint.rate),
    defaultValue: TypePoint.fixed,
  })
  typePoint: TypePoint;

  @Column({
    field: 'bronze_discount',
    type: FLOAT,
    defaultValue: 0,
  })
  bronzeDiscount: number;

  @Column({
    field: 'silver_discount',
    type: FLOAT,
    defaultValue: 0,
  })
  silverDiscount: number;

  @Column({
    field: 'golden_discount',
    type: FLOAT,
    defaultValue: 0,
  })
  goldenDiscount: number;

  @Column({
    field: 'max_point',
    type: FLOAT,
    defaultValue: 0,
  })
  maxPoint: number;

  @Column({
    field: 'bronze_point',
    type: FLOAT,
    defaultValue: 0,
  })
  bronzePoint: number;

  @Column({
    field: 'silver_point',
    type: FLOAT,
    defaultValue: 0,
  })
  silverPoint: number;

  @Column({
    field: 'golden_point',
    type: FLOAT,
    defaultValue: 0,
  })
  goldenPoint: number;

  @Column({
    field: 'minium_money',
    type: FLOAT,
    defaultValue: 0,
  })
  miniumMoney: number;

  @Column({ field: 'otp_code', type: DataType.STRING })
  otpCode: string;

  @Column({ field: 'code_expire_time' })
  codeExpireTime: Date;

  @Column({
    field: 'is_code_used',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isCodeUsed: string;

  @Column({
    field: 'is_active',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @Column({ field: 'refresh_token', type: DataType.STRING })
  refreshToken: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
