import { StoreRank } from './store_ranks.entity';

export const storeRanksProviders = [
  { provide: 'StoreRanksRepository', useValue: StoreRank },
];
