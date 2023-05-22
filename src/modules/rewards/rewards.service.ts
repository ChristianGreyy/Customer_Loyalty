import {
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateRewardDto from './dtos/create-reward.dto';
import UpdateRewardDto from './dtos/update-reward.dto';
import { Reward } from './reward.entity';
import { UploadService } from '../upload/upload.service';
import { StoresService } from '../stores/stores.service';
import { Store } from '../stores/store.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RewardsService {
  constructor(
    @Inject('RewardsRepository')
    private readonly rewardsRepository: typeof Reward,
    private storeService: StoresService,
    private uploadService: UploadService,
  ) {}

  async getRewards(): Promise<Reward[]> {
    return await this.rewardsRepository.findAll();
  }

  async getRewardsByStoreId(storeId: number): Promise<Reward[]> {
    return await this.rewardsRepository.findAll({
      where: {
        storeId: storeId,
      },
    });
  }

  async getRewardsByUserId(userId: number): Promise<Reward[]> {
    return await this.rewardsRepository.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
        },
      ],
    });
  }

  async getRewardById(rewardId: number): Promise<Reward> {
    const reward = await this.rewardsRepository.findByPk(rewardId);
    return reward;
  }

  async createReward(
    createRewardDto: any | CreateRewardDto,
    image: Express.Multer.File,
  ): Promise<Reward> {
    const store = await this.storeService.getStoreById(
      +createRewardDto.storeId,
    );
    if (!store || store.isActive === false) {
      throw new NotFoundException('Store not found or is not active');
    }
    // console.log(image);

    const url = await this.uploadService.uploadImage(image);
    createRewardDto['image'] = url;

    return await this.rewardsRepository.create(createRewardDto);
  }

  async updateRewardById(
    updateRewardDto: any,
    rewardId: number,
  ): Promise<void> {
    const reward = await this.getRewardById(rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    await this.rewardsRepository.update(updateRewardDto, {
      where: {
        id: rewardId,
      },
    });
  }

  async updateRewardsByPersonalStoreId(
    updateRewardDto: any,
    rewardId: number,
    userId: number,
  ): Promise<void> {
    const reward = await this.rewardsRepository.findOne({
      where: {
        id: rewardId,
        storeId: userId,
      },
    });
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    await this.rewardsRepository.update(updateRewardDto, {
      where: {
        id: rewardId,
      },
    });
  }

  async deleteRewardById(rewardId: number): Promise<void> {
    const reward = await this.getRewardById(rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    await this.rewardsRepository.destroy({
      where: {
        id: rewardId,
      },
    });
  }

  async deleteRewardsByPersonalStoreId(
    rewardId: number,
    userId: number,
  ): Promise<void> {
    const reward = await this.getRewardById(rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    await this.rewardsRepository.destroy({
      where: {
        id: rewardId,
      },
    });
  }
}
