import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { storesProviders } from './stores.providers';

@Module({
  imports: [],
  controllers: [StoresController],
  providers: [StoresService, ...storesProviders],
  exports: [StoresService, ...storesProviders],
})
export class StoresModule {}
