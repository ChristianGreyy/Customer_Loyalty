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

@Injectable()
export class RewardsService {
  constructor(
    @Inject('RewardsRepository')
    private readonly rewardsRepository: typeof Reward,
  ) {}

  async getRewards(): Promise<Reward[]> {
    return await this.rewardsRepository.findAll();
  }

  async getRewardById(rewardId: number): Promise<Reward> {
    const reward = await this.rewardsRepository.findByPk(rewardId);
    return reward;
  }

  async createReward(createRewardDto: any | CreateRewardDto): Promise<Reward> {
    return;
    return await this.rewardsRepository.create(createRewardDto);
  }

  async updateRewardById(
    updateRewardDto: any,
    rewardId: number,
  ): Promise<void> {
    const reward = await this.getRewardById(rewardId);
    console.log(reward);
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
}
