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
import { User } from '../user.entity';
import { mockUsersRepository } from '../mocks/users.repository.mock';
import { foundUserStub, userStub } from './stubs/user.stub';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      providers: [
        UsersService,
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    describe('when find all is called', () => {
      let users: any;

      beforeEach(async () => {
        users = await usersService.getUsers();
      });

      it('when it should call the userRepository', () => {
        expect(mockUsersRepository.findAll).toBeCalledWith({
          attributes: {
            exclude: [
              'password',
              'otpCode',
              'codeExpireTime',
              'isCodeUsed',
              'refreshToken',
            ],
          },
        });
      });

      it('then it should return users', () => {
        expect(users).toEqual([userStub]);
      });
    });
  });

  describe('findOne', () => {
    describe('when find all is called', () => {
      let user: any;

      beforeEach(async () => {
        user = await usersService.getUserById(1);
      });

      it('when it should call the userRepository', () => {
        expect(mockUsersRepository.findOne).toBeCalledWith({
          where: {
            id: 1,
          },
          attributes: {
            exclude: [
              'password',
              'otpCode',
              'codeExpireTime',
              'isCodeUsed',
              'refreshToken',
            ],
          },
        });
      });

      it('then it should return a user', () => {
        expect(user).toEqual(foundUserStub);
      });
    });
  });

  // describe('create', () => {
  //   describe('when create is called', () => {
  //     let user: any;

  //     beforeEach(async () => {
  //       user = await usersService.createUser(userStub);
  //     });

  //     it('when it should call the userRepository', () => {
  //       expect(mockUsersRepository.create).toBeCalledWith(userStub);
  //     });

  //     it('then it should return a new user', () => {
  //       expect(user).toEqual(userStub);
  //     });
  //   });
  // });

  describe('destroy', () => {
    describe('when destroy is called', () => {
      let user: any;

      beforeEach(async () => {
        user = await usersService.deleteUserById(1);
      });

      it('when it should call the userRepository', () => {
        expect(mockUsersRepository.destroy).toBeCalledWith({
          where: {
            id: 1,
          },
        });
      });
    });
  });
});
