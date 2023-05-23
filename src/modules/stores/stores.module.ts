import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { storesProviders } from './stores.providers';
import { RedisModule } from '../redis/redis.module';
import { MailerModule } from '../mailer/mailer.module';
import { RanksModule } from '../ranks/ranks.module';
import { StoreRanksModule } from '../store_ranks/store_ranks.module';

@Module({
  imports: [RedisModule, MailerModule, StoreRanksModule],
  controllers: [StoresController],
  providers: [StoresService, ...storesProviders],
  exports: [StoresService, ...storesProviders],
})
export class StoresModule {}
