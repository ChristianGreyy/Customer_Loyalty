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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import CreateRewardDto from './dtos/create-reward.dto';
import UpdateRewardDto from './dtos/update-reward.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

@Controller('rewards')
export class RewardsController {
  constructor(
    private rewardService: RewardsService,
    private uploadService: UploadService,
  ) {}

  // @UseGuards(AuthGuard)
  @Get('/')
  async getRewards() {
    const rewards = await this.rewardService.getRewards();
    return rewards;
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async createReward(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRewardDto: any,
  ) {
    const url = await this.uploadService.upload(file);
    console.log(url);
    // console.log(createRewardDto.storeId);
    // console.log(file);
    return url;
    // const newReward = await this.rewardService.createReward(createRewardDto);
    // return newReward;
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
