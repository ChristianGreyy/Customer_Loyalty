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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RewardsService } from './rewards.service';
import CreateRewardDto from './dtos/create-reward.dto';
import UpdateRewardDto from './dtos/update-reward.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasRoles } from 'src/common/decorators/has-roles.decorator';
import { Role } from 'src/common/enums/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import CreatePersonalRewardDto from './dtos/create-personal-reward.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reward')
@Controller('rewards')
export class RewardsController {
  constructor(private rewardService: RewardsService) {}

  @HasRoles(Role.admin, Role.store, Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async getRewards() {
    const rewards = await this.rewardService.getRewards();
    return rewards;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  @UseInterceptors(FileInterceptor('image'))
  async createReward(
    @UploadedFile() image: Express.Multer.File,
    @Body() createRewardDto: CreateRewardDto,
  ) {
    const newReward = await this.rewardService.createReward(
      createRewardDto,
      image,
    );
    return newReward;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/stores/:storeId')
  async getRewardsByStoreId(@Param('storeId', ParseIntPipe) storeId: number) {
    const rewards = await this.rewardService.getRewardsByStoreId(storeId);
    return rewards;
  }

  @HasRoles(Role.store)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/personal-store')
  async getRewardsByPersonalStoreId(@Request() req) {
    const rewards = await this.rewardService.getRewardsByStoreId(req.user.id);
    return rewards;
  }

  @HasRoles(Role.store)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/personal-store')
  @UseInterceptors(FileInterceptor('image'))
  async createRcreateRewardsByPersonalStoreIdeward(
    @UploadedFile() image: Express.Multer.File,
    @Body() createRewardDto: CreatePersonalRewardDto,
    @Request() req,
  ) {
    createRewardDto['storeId'] = req.user.id;
    const newReward = await this.rewardService.createReward(
      createRewardDto,
      image,
    );
    return newReward;
  }

  @HasRoles(Role.store)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/personal-store/:rewardId')
  async updateRewardsByPersonalStoreId(
    @Request() req,
    @Body() updateRewardDto: UpdateRewardDto,
    @Param('rewardId', ParseIntPipe) rewardId: number,
  ) {
    await this.rewardService.updateRewardsByPersonalStoreId(
      updateRewardDto,
      rewardId,
      req.user.id,
    );
    return {
      message: 'Update reward successfully',
    };
  }

  @HasRoles(Role.store)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/personal-store/:rewardId')
  async deleteRewardsByPersonalStoreId(
    @Request() req,
    @Param('rewardId', ParseIntPipe) rewardId: number,
  ) {
    await this.rewardService.deleteRewardsByPersonalStoreId(
      rewardId,
      req.user.id,
    );
    return {
      message: 'Delete reward successfully',
    };
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/users/:userId')
  async getRewardsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    const rewards = await this.rewardService.getRewardsByUserId(userId);
    return rewards;
  }

  @HasRoles(Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/personal')
  async getRewardsByPersonalId(@Request() req) {
    console.log(req.user.id);
    const rewards = await this.rewardService.getRewardsByUserId(req.user.id);
    return rewards;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:rewardId')
  async getRewardById(@Param('rewardId', ParseIntPipe) rewardId: number) {
    const reward = await this.rewardService.getRewardById(rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    return reward;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:rewardId')
  async deleteRewardById(@Param('rewardId', ParseIntPipe) rewardId: number) {
    await this.rewardService.deleteRewardById(rewardId);
    return { message: 'Delete reward successfully' };
  }
}
