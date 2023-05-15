import {
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findByPk(userId);
    return user;
  }

  async createUser(createUserDto: any | CreateUserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 7);
    createUserDto['password'] = hashedPassword;
    return await this.usersRepository.create(createUserDto);
  }

  async updateUserById(updateUserDto: any, userId: number): Promise<any> {
    const user = await this.getUserById(userId);
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.update(updateUserDto, {
      where: {
        id: userId,
      },
    });
  }

  async deleteUserById(userId: number): Promise<any> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.destroy({
      where: {
        id: userId,
      },
    });
  }
}
