import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dtos/create-user.dto';
import UpdateUserDto from './dtos/update-user.dto';
import { User } from './user.entity';
import CreateOrderDetailDto from './dtos/create-order-detail';
import { OrderDetail } from '../order_details/order_details.entity';
import { Store } from '../stores/store.entity';
import { StoresService } from '../stores/stores.service';
import { Rank } from 'src/common/enums/rank';
import { Reward } from '../rewards/reward.entity';
import { RewardsService } from '../rewards/rewards.service';
import CreateUserRewardDto from './dtos/create-user-reward';
import { UserReward } from '../user_rewards/user_rewards.entity';
import { Queue } from 'twilio/lib/twiml/VoiceResponse';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class UsersService {
  constructor(
    @InjectQueue('CL:users') private audioQueue: Queue,
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    @Inject('OrderDetailsRepository')
    private readonly orderDetailsRepository: typeof OrderDetail,

    private readonly rewardsService: RewardsService,
    private readonly storesService: StoresService,
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

  async updateUserById(updateUserDto: any, userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.update(updateUserDto, {
      where: {
        id: userId,
      },
    });
  }

  async deleteUserById(userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.destroy({
      where: {
        id: userId,
      },
    });
  }

  async createOrderDetail(
    userId: number,
    storeId: number,
    createOrderDto: CreateOrderDetailDto,
  ): Promise<any> {
    const store = await this.storesService.getStoreById(storeId);
    if (!store || store.isActive == false) {
      throw new NotFoundException('Store not found');
    }
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let totalMoney = createOrderDto.totalMoney;
    let totalPoint = 0;
    switch (store.typePoint) {
      case 'fixed': {
        let rate = Math.floor(totalMoney / store.miniumMoney);
        if (user.rank == 'bronze') {
          totalPoint = rate * store.bronzePoint;
        } else if (user.rank == 'silver') {
          totalPoint = rate * store.silverPoint;
        } else if (user.rank == 'golden') {
          totalPoint = rate * store.goldenPoint;
        }
        break;
      }
      case 'rate': {
        if (user.rank == 'bronze') {
          totalPoint = Math.floor(totalMoney * store.bronzeDiscount);
        } else if (user.rank == 'silver') {
          totalPoint = Math.floor(totalMoney * store.silverDiscount);
        } else if (user.rank == 'golden') {
          totalPoint = Math.floor(totalMoney * store.goldenDiscount);
        }
        totalPoint = totalPoint > store.maxPoint ? store.maxPoint : totalPoint;
        break;
      }
    }
    const orderDetail = {
      totalMoney: createOrderDto.totalMoney,
      totalPoint,
      userId,
      storeId,
    };
    user.point += totalPoint;
    if (user.point >= 5000) {
      user.rank = Rank.golden;
    } else if (user.point >= 2000) {
      user.rank = Rank.silver;
    }
    await user.save();
    const orderDetailDoc = await this.orderDetailsRepository.create(
      orderDetail,
    );
    return orderDetailDoc;
  }

  async changeReward(
    userId: number,
    rewardId: number,
    createUserRewardDto: CreateUserRewardDto,
  ): Promise<any> {
    const job = await this.audioQueue.add('change-reward', {
      userId,
      rewardId,
      quantity: createUserRewardDto.quantity,
    });

    return 'Reward product successfully, please wait for minute';
  }
}
