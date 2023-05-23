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
import { Reward } from '../rewards/reward.entity';
import { RewardsService } from '../rewards/rewards.service';
import CreateUserRewardDto from './dtos/create-user-reward';
import { UserReward } from '../user_rewards/user_rewards.entity';
import { Queue } from 'twilio/lib/twiml/VoiceResponse';
import { InjectQueue } from '@nestjs/bull';
import { SEQUELIZE } from 'src/common/constants';
import { Sequelize } from 'sequelize';
import * as moment from 'moment';
import { TwilioService } from '../twilio/twilio.service';
import { Rank } from '../ranks/rank.entity';
import { StoreRank } from '../store_ranks/store_ranks.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectQueue('CL:users') private audioQueue: Queue,
    @Inject('UsersRepository')
    private readonly usersRepository: typeof User,
    @Inject('OrderDetailsRepository')
    private readonly orderDetailsRepository: typeof OrderDetail,
    @Inject('RanksRepository')
    private readonly ranksRepository: typeof Rank,
    @Inject('StoreRanksRepository')
    private readonly storeRanksRepository: typeof StoreRank,
    private readonly storesService: StoresService,
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
    private readonly twiioService: TwilioService,
  ) {}

  async getRandomInt(min: number, max: number): Promise<number> {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.findAll({
      attributes: {
        exclude: [
          'password',
          'otpCode',
          'codeExpireTime',
          'isCodeUsed',
          'refreshToken',
          // 'createdAt',
          // 'updatedAt',
        ],
      },
    });
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: [
          'password',
          'otpCode',
          'codeExpireTime',
          'isCodeUsed',
          'refreshToken',
          // 'createdAt',
          // 'updatedAt',
        ],
      },
    });
    return user;
  }

  async getUserByPersonalId(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: [
          'password',
          'otpCode',
          'codeExpireTime',
          'isCodeUsed',
          'refreshToken',
          // 'createdAt',
          // 'updatedAt',
        ],
      },
      include: {
        model: Rank,
      },
    });
    return user;
  }

  async createUser(createUserDto: any | CreateUserDto): Promise<User> {
    // Check user exists ?
    const user: any = await this.usersRepository.findOne({
      where: { phoneNumber: createUserDto.phoneNumber },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const otpCode = await this.getRandomInt(1000, 9999);
    createUserDto['otpCode'] = otpCode;
    this.twiioService.sendSms('+84359741482', `Your OTP code: ${otpCode}`);
    // this.twiioService.sendSms('+840842338169', `Your OTP code: ${otpCode}`);

    const codeExpireTime = moment().add(2, 'minutes');
    createUserDto['codeExpireTime'] = codeExpireTime;

    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 7);
    createUserDto['password'] = hashedPassword;

    const rank = await this.ranksRepository.findOne({
      where: {
        name: 'bronze',
      },
    });

    createUserDto['rankId'] = rank.id;

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
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Rank,
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const totalMoney = createOrderDto.totalMoney;
    let totalPoint = 0;
    const rank = user.rank;
    const storeRanks = await this.storeRanksRepository.findOne({
      where: {
        rankId: rank.id,
        storeId: store.id,
      },
    });

    switch (store.typePoint) {
      case 'fixed': {
        const rate = Math.floor(totalMoney / store.miniumMoney);
        totalPoint = rate * storeRanks.point;
        console.log(totalPoint);
        break;
      }
      case 'rate': {
        totalPoint = Math.floor(totalMoney * storeRanks.discount);
        totalPoint =
          totalPoint > storeRanks.maxPoint ? storeRanks.maxPoint : totalPoint;
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
    user.hoardingPoints += totalPoint;

    const ranks = await this.ranksRepository.findAll({
      order: [['point', 'DESC']],
    });

    for (let rank of ranks) {
      if (user.hoardingPoints > rank.point) {
        console.log(rank.point);
        user.rankId = rank.id;
        break;
      }
    }

    let orderDetailDoc;
    try {
      await this.sequelize.transaction(async (t) => {
        await user.save({ transaction: t });
        orderDetailDoc = await this.orderDetailsRepository.create(orderDetail, {
          transaction: t,
        });
      });
    } catch (err) {
      console.log(err);
    }
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
