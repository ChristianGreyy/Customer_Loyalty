import { Sequelize } from 'sequelize-typescript';
import {
  SEQUELIZE,
  DEVELOPMENT,
  TEST,
  PRODUCTION,
} from '../../common/constants';
import { databaseConfig } from './database.config';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { Reward } from '../rewards/reward.entity';
import { OrderDetail } from '../order_details/order_details.entity';
import { UserReward } from '../user_rewards/user_rewards.entity';
import { Admin } from '../admin/admin.entity';
import { StoreRank } from '../store_ranks/store_ranks.entity';
import { Rank } from '../ranks/rank.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      try {
        await sequelize.authenticate();
        console.log('Connection database successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      sequelize.addModels([
        User,
        Reward,
        Store,
        OrderDetail,
        UserReward,
        Admin,
        Rank,
        StoreRank,
      ]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
