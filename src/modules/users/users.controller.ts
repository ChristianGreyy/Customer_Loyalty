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
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import CreateOrderDetailDto from './dtos/create-order-detail';
import CreateUserRewardDto from './dtos/create-user-reward';
import { HasRoles } from '../../common/decorators/has-roles.decorator';
import { Role } from '../../common/enums/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal error',
  })
  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ type: User })
  @ApiCreatedResponse({ type: User })
  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }

  @ApiOperation({ summary: 'Get personal profile' })
  @ApiOkResponse({ type: User })
  @HasRoles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/personal')
  async getUserByPersonalId(@Request() req) {
    const user = await this.userService.getUserByPersonalId(req.user.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    schema: {
      type: 'object',
      properties: {
        message: {
          example: 'Update user successfully',
        },
      },
    },
  })
  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:userId')
  async updateUserById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const user = await this.userService.updateUserById(updateUserDto, userId);
    return { message: 'Update user successfully', user };
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:userId')
  async deleteUserById(@Param('userId', ParseIntPipe) userId: number) {
    await this.userService.deleteUserById(userId);
    return { message: 'Delete user successfully' };
  }

  @ApiOperation({ summary: 'Create order detail of user' })
  @HasRoles(Role.store)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/:userId/order')
  async createOrderDetail(
    @Param('userId', ParseIntPipe) userId,
    // @Param('storeId', ParseIntPipe) storeId,
    @Request() req,
    @Body() createOrderDto: CreateOrderDetailDto,
  ) {
    const storeId = req.user.id;
    const orderDetail = await this.userService.createOrderDetail(
      userId,
      storeId,
      createOrderDto,
    );

    return orderDetail;
  }

  @ApiOperation({ summary: 'Change reward from store' })
  @HasRoles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/change-reward/:rewardId')
  async changeReward(
    @Request() req,
    @Param('rewardId', ParseIntPipe) rewardId,
    @Body() createUserRewardDto: CreateUserRewardDto,
  ) {
    const message = await this.userService.changeReward(
      req.user.id,
      rewardId,
      createUserRewardDto,
    );

    return {
      message,
    };
  }
}
