import { Module } from '@nestjs/common';
import { storeRanksProviders } from './store_ranks.providers';

@Module({
  imports: [],
  providers: [...storeRanksProviders],
  exports: [...storeRanksProviders],
})
export class StoreRanksModule {}
