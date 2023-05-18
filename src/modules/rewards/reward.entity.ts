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
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Store } from '../stores/store.entity';
import { User } from '../users/user.entity';
import { UserReward } from '../user_rewards/user_rewards.entity';

@Table({
  tableName: 'Rewards',
})
export class Reward extends Model<Reward> {
  @BelongsToMany(() => User, () => UserReward)
  users: User[];

  @ForeignKey(() => Store)
  @Column({ field: 'store_id' })
  storeId: string;

  @BelongsTo(() => Store)
  stores: Store;

  @Unique
  @Column
  name: string;

  @Unique
  @Column
  point: number;

  @Unique
  @Column
  image: string;

  @Column({ field: 'start_time' })
  startTime: Date;

  @Column({ field: 'end_time' })
  endTime: Date;

  @Unique
  @Column
  quantity: number;

  @Unique
  @Column
  description: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
