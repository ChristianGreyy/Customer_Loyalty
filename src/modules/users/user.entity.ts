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
  tableName: 'Users',
})
export class User extends Model<User> {
  @Unique
  @Column({ field: 'phone_number' })
  phoneNumber: string;

  @Column
  password: string;

  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column(DataType.DATEONLY)
  birthday: string;

  @Column({ type: DataType.ENUM(Gender.female, Gender.male) })
  gender: Gender;

  @Column({ type: DataType.DOUBLE, defaultValue: 0 })
  point: number;

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

  @Column({ field: 'refresh_token', type: DataType.STRING })
  refreshToken: string;

  @Column({ type: DataType.ENUM(Rank.bronze, Rank.silver, Rank.golden) })
  rank: Rank;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
