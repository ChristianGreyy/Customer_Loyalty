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
} from 'sequelize-typescript';
import { Gender } from '../../common/enums/gender';
import { Role } from 'src/common/enums/role';
import { Rank } from 'src/common/enums/rank';

@Table({
  tableName: 'Stores',
})
export class Store extends Model<Store> {
  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  name: string;

  @Column({
    field: 'type_point',
    type: DataType.ENUM(Rank.bronze, Rank.silver, Rank.golden),
    defaultValue: Rank.bronze,
  })
  typePoint: Rank;

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
  isActive: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
