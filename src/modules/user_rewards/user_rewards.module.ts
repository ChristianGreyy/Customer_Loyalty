import { Module } from '@nestjs/common';
import { userRewardsProviders } from './user_rewards.providers';

@Module({
  imports: [],
  providers: [...userRewardsProviders],
  exports: [...userRewardsProviders],
})
export class UserRewardsModule {}
