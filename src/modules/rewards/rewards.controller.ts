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
import { RewardsService } from './rewards.service';
import CreateRewardDto from './dtos/create-reward.dto';
import UpdateRewardDto from './dtos/update-reward.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('rewards')
export class RewardsController {
  constructor(private rewardService: RewardsService) {}

  // @UseGuards(AuthGuard)
  @Get('/')
  async getRewards() {
    const rewards = await this.rewardService.getRewards();
    return rewards;
  }

  @Post('/')
  async createReward(@Body() createRewardDto: CreateRewardDto) {
    const newReward = await this.rewardService.createReward(createRewardDto);
    return newReward;
  }

  @Get('/:rewardId')
  async getRewardById(@Param('rewardId', ParseIntPipe) rewardId: number) {
    const reward = await this.rewardService.getRewardById(rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    return reward;
  }

  @Put('/:rewardId')
  async updateRewardById(
    @Body() updateRewardDto: UpdateRewardDto,
    @Param('rewardId', ParseIntPipe) rewardId: number,
  ) {
    await this.rewardService.updateRewardById(updateRewardDto, rewardId);
    return {
      message: 'Update reward successfully',
    };
  }

  @Delete('/:rewardId')
  async deleteRewardById(@Param('rewardId', ParseIntPipe) rewardId: number) {
    await this.rewardService.deleteRewardById(rewardId);
    return { message: 'Delete reward successfully' };
  }
}
