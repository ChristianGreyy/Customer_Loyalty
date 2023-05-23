import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { OrderDetailsModule } from '../order_details/order_details.module';
import { StoresModule } from '../stores/stores.module';
import { RewardsModule } from '../rewards/rewards.module';
import { UserRewardsModule } from '../user_rewards/user_rewards.module';
import { BullModule } from '@nestjs/bull';
import { UsersConsumer } from './users.consumer';
import { DatabaseModule } from '../database/database.module';
import { TwilioModule } from '../twilio/twilio.module';
import { RanksModule } from '../ranks/ranks.module';
import { StoreRanksModule } from '../store_ranks/store_ranks.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'CL:users',
    }),
    OrderDetailsModule,
    StoresModule,
    RewardsModule,
    RanksModule,
    UserRewardsModule,
    StoreRanksModule,
    DatabaseModule,
    TwilioModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersConsumer, ...usersProviders],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
