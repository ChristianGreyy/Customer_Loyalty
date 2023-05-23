import { Rank } from './rank.entity';

export const ranksProviders = [{ provide: 'RanksRepository', useValue: Rank }];
