import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { storesProviders } from './stores.providers';
import { RedisModule } from '../redis/redis.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [RedisModule, MailerModule],
  controllers: [StoresController],
  providers: [StoresService, ...storesProviders],
  exports: [StoresService, ...storesProviders],
})
export class StoresModule {}
