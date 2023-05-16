import { Reward } from './reward.entity';

export const rewardsProviders = [
  { provide: 'RewardsRepository', useValue: Reward },
];
