import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { UserReward } from '../user_rewards/user_rewards.entity';
import { Reward } from '../rewards/reward.entity';
import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RewardsService } from '../rewards/rewards.service';
import { Sequelize } from 'sequelize';
import { SEQUELIZE } from 'src/common/constants';
// import { Sequelize } from 'sequelize-typescript';

@Processor('CL:users')
export class UsersConsumer {
  constructor(
    @Inject('UserRewardsRepository')
    private readonly userRewardsRepository: typeof UserReward,
    @Inject('RewardsRepository')
    private readonly rewardsRepository: typeof Reward,
    private readonly userService: UsersService,
    private readonly rewardsService: RewardsService,
    @Inject(SEQUELIZE)
    private readonly sequelize: Sequelize,
  ) {}

  @Process('change-reward')
  async transcode(job: Job<any>) {
    const { quantity, userId, rewardId } = job.data;
    const reward = await this.rewardsService.getRewardById(rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    if (reward.startTime > new Date() || reward.endTime < new Date()) {
      throw new BadRequestException("Sorry, the reward don't start");
    }
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userReward = {
      quantity: quantity,
      point: reward.point,
      userId: user.id,
      rewardId: reward.id,
    };
    try {
      await this.sequelize.transaction(async (t) => {
        // update User
        user.point -= reward.point * userReward.quantity;
        if (user.point < 0) {
          throw new InternalServerErrorException('Transaction error');
        }
        await user.save({ transaction: t });
        // update Reward
        reward.quantity -= userReward.quantity;
        if (reward.quantity < 0) {
          throw new InternalServerErrorException('Transaction error');
        }
        await reward.save({ transaction: t });
        // creae UserReward
        const userRewardDoc = await this.userRewardsRepository.create(
          userReward,
          { transaction: t },
        );
        return userRewardDoc;
      });
    } catch (err) {
      console.log(err);
    }
  }
}
