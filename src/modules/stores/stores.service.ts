import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import CreateStoreDto from './dtos/create-store.dto';
import UpdateStoreDto from './dtos/update-store.dto';
import { Store } from './store.entity';
import { Reward } from '../rewards/reward.entity';
import { RedisService } from '../redis/redis.service';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class StoresService {
  constructor(
    @Inject('StoresRepository')
    private readonly storesRepository: typeof Store,
    private readonly redisService: RedisService,
    private readonly mailerService: MailerService,
  ) {}

  async getRandomInt(min: number, max: number): Promise<number> {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  async getStores(): Promise<Store[]> {
    const cacheKey = 'CL:stores';
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      const stores = JSON.parse(cachedData);
      return stores;
    }

    const stores = await this.storesRepository.findAll();

    await this.redisService.set(cacheKey, JSON.stringify(stores));

    return stores;
  }

  async getStoresByRewardId(rewardId: number): Promise<Store[]> {
    return await this.storesRepository.findAll({
      include: {
        model: Reward,
        where: {
          id: rewardId,
        },
      },
    });
  }

  async getStoreById(storeId: number): Promise<Store> {
    const store = await this.storesRepository.findByPk(storeId);
    return store;
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    // Check user exists ?
    const store: any = await this.storesRepository.findOne({
      where: { email: createStoreDto.email },
    });
    if (store) {
      throw new BadRequestException('Email already exists');
    }
    // generate OTP Code
    const otpCode = await this.getRandomInt(1000, 9999);
    createStoreDto['otpCode'] = otpCode.toString();
    // set expire time to  OTP Code
    const codeExpireTime = moment().add(2, 'minutes');
    createStoreDto['codeExpireTime'] = codeExpireTime;
    // send mailer
    this.mailerService.sendOtpEmail(createStoreDto.email, otpCode.toString());
    return await this.storesRepository.create(createStoreDto);
  }

  async updateStoreById(updateStoreDto: any, storeId: number): Promise<void> {
    const store = await this.getStoreById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    await this.storesRepository.update(updateStoreDto, {
      where: {
        id: storeId,
      },
    });
  }

  async deleteStoreById(storeId: number): Promise<void> {
    const store = await this.getStoreById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    await this.storesRepository.destroy({
      where: {
        id: storeId,
      },
    });
  }
}
