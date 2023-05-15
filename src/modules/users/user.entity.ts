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
import { Gender } from '../../common/enums/gender';
import { Role } from 'src/common/enums/role';

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
  // @Column({
  //   primaryKey: true,
  // })
  // id: number;

  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ type: DataType.ENUM(Gender.female, Gender.male) })
  gender: Gender;

  @Column(DataType.DATEONLY)
  birthday: string;

  @Column({ type: DataType.ENUM(Role.admin, Role.user) })
  role: Role;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
