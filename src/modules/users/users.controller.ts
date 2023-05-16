import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // @UseGuards(AuthGuard)
  @Get('/')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @Get('/:userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put('/:userId')
  async updateUserById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.userService.updateUserById(updateUserDto, userId);
    return { message: 'Update user successfully' };
  }

  @Delete('/:userId')
  async deleteUserById(@Param('userId', ParseIntPipe) userId: number) {
    await this.userService.deleteUserById(userId);
    return { message: 'Delete user successfully' };
  }
}
