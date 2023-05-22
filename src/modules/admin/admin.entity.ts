import {
  Table,
  Column,
  Model,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Gender } from '../../common/enums/gender';

@Table({
  tableName: 'Admins',
})
export class Admin extends Model<Admin> {
  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ field: 'refresh_token', type: DataType.STRING })
  refreshToken: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  updatedAt: Date;
}
