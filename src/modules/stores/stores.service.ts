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
import { MailersService } from '../mailer/mailer.service';
import { Rank } from '../ranks/rank.entity';
import { StoreRank } from '../store_ranks/store_ranks.entity';
import { RanksService } from '../ranks/ranks.service';
import UpdatePointRankDto from '../ranks/dtos/update-point-rank.dto';

@Injectable()
export class StoresService {
  constructor(
    @Inject('StoresRepository')
    private readonly storesRepository: typeof Store,
    // @Inject('RanksRepository')
    // private readonly ranksRepository: typeof Rank,
    @Inject('StoreRanksRepository')
    private readonly storeRanksRepository: typeof StoreRank,
    private readonly redisService: RedisService,
    private readonly mailerService: MailersService,
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

  async getStoreByRewardId(rewardId: number): Promise<Store> {
    return await this.storesRepository.findOne({
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

  async getStoreByPersonalId(storeId: number): Promise<Store> {
    const store = await this.storesRepository.findOne({
      where: {
        id: storeId,
      },
      include: [
        {
          model: Rank,
        },
      ],
    });
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

    const newStore = await this.storesRepository.create(createStoreDto);

    return newStore;
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

  async updateStorePointById(
    updateStoreDto: UpdatePointRankDto,
    storeId: number,
  ): Promise<void> {
    const store = await this.getStoreById(storeId);
    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const storeDoc = await this.storesRepository.findOne({
      where: {
        id: store.id,
      },
      include: [
        {
          model: Rank,
          where: {
            name: updateStoreDto.rank,
          },
        },
      ],
    });
    const rankId = storeDoc.ranks[0].id;
    await this.storeRanksRepository.update(updateStoreDto, {
      where: {
        rankId: rankId,
        storeId: storeId,
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
