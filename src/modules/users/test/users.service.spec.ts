import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { TwilioService } from '../../twilio/twilio.service';
import { OrderDetailsModule } from '../../order_details/order_details.module';
import { StoresModule } from '../../stores/stores.module';
import { RewardsModule } from '../../rewards/rewards.module';
import { RanksModule } from '../../ranks/ranks.module';
import { UserRewardsModule } from '../../user_rewards/user_rewards.module';
import { StoreRanksModule } from '../../store_ranks/store_ranks.module';
import { DatabaseModule } from '../../database/database.module';
import { TwilioModule } from '../../twilio/twilio.module';
import { BullModule } from '@nestjs/bull';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {};
  const mockOrderDetailsRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OrderDetailsModule,
        StoresModule,
        RewardsModule,
        RanksModule,
        UserRewardsModule,
        StoreRanksModule,
        DatabaseModule,
        TwilioModule,
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
