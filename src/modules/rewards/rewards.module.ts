import { Module } from '@nestjs/common';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { rewardsProviders } from './rewards.providers';
import { UploadsModule } from '../upload/uploads.module';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [UploadsModule, StoresModule],
  controllers: [RewardsController],
  providers: [RewardsService, ...rewardsProviders],
  exports: [RewardsService, ...rewardsProviders],
})
export class RewardsModule {}
