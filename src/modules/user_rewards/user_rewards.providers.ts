import { UserReward } from './user_rewards.entity';

export const userRewardsProviders = [
  { provide: 'UserRewardsRepository', useValue: UserReward },
];
