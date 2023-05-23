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
import { StoreRank } from '../store_ranks/store_ranks.entity';
@Table({
  tableName: 'Ranks',
})
export class Rank extends Model<Rank> {
  @BelongsToMany(() => Store, () => StoreRank)
  stores: Store[];

  @Column
  name: string;

  @Column
  point: number;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
