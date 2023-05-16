import { Module } from '@nestjs/common';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { rewardsProviders } from './rewards.providers';

@Module({
  controllers: [RewardsController],
  providers: [RewardsService, ...rewardsProviders],
  exports: [RewardsService, ...rewardsProviders],
})
export class RewardsModule {}
