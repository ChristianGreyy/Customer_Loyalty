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
import { User } from '../users/user.entity';
import { Reward } from '../rewards/reward.entity';

@Table({
  tableName: 'User_Rewards',
})
export class UserReward extends Model<UserReward> {
  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Reward)
  @Column({ field: 'reward_id' })
  rewardId: number;

  @Column
  quantity: number;

  @Column
  point: number;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
