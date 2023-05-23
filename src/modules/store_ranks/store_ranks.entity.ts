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
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { Rank } from '../ranks/rank.entity';

@Table({
  tableName: 'Store_Ranks',
})
export class StoreRank extends Model<StoreRank> {
  @ForeignKey(() => Rank)
  @Column({ field: 'rank_id' })
  rankId: number;

  @ForeignKey(() => Store)
  @Column({ field: 'store_id' })
  storeId: number;

  @Column
  discount: number;

  @Column
  point: number;

  @Column({ field: 'max_point' })
  maxPoint: number;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
