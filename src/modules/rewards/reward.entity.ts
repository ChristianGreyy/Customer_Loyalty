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
} from 'sequelize-typescript';

@Table({
  tableName: 'Rewards',
})
export class Reward extends Model<Reward> {
  @Unique
  @Column({ field: 'store_id' })
  storeId: string;

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
