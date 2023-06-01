import { Rank } from '../../../common/enums/rank';
import { Gender } from '../../../common/enums/gender';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Test } from '@nestjs/testing';
import { mockUsersService } from '../mocks/users.service.mock';
import { userStub } from './stubs/user.stub';
import CreateUserDto from '../dtos/create-user.dto';
import UpdateUserDto from '../dtos/update-user.dto';

// jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  // const mockUsersService = {
  //   createUser: jest.fn((dto) => {
  //     return {
  //       id: Date.now(),
  //       ...dto,
  //     };
  //   }),
  //   updateUserById: jest.fn((dto, id) => {
  //     return {
  //       id,
  //       ...dto,
  //     };
  //   }),
  // };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();
    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    // jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getUsers', () => {
    describe('when get user is called', () => {
      let users: any;
      beforeEach(async () => {
        users = await usersController.getUsers();
      });

      it('then it should call userService', () => {
        expect(usersService.getUsers).toBeCalledWith();
      });

      it('then it should return list of users', () => {
        expect(users).toEqual([userStub]);
      });
    });
  });

  describe('getUserById', () => {
    describe('when get user by id is called', () => {
      let user: any;
      beforeEach(async () => {
        user = await usersController.getUserById(userStub.id);
      });

      it('then it should call userService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub.id);
      });

      it('then it should return a user', () => {
        expect(user).toEqual(userStub);
      });
    });
  });

  describe('createUser', () => {
    describe('when get user is called', () => {
      const createUserDto: CreateUserDto = {
        phoneNumber: '0842338168',
        password: 'HungTruong@',
        firstName: 'Hung',
        lastName: 'Truong',
        gender: Gender.male,
        birthday: '2002-05-23',
      };
      let user: any;
      beforeEach(async () => {
        user = await usersController.createUser(createUserDto);
      });

      it('then it should call userService', () => {
        expect(usersService.createUser).toBeCalledWith(createUserDto);
      });

      it('then it should return created user', () => {
        expect(user).toEqual(userStub);
      });
    });
  });

  describe('updateUser', () => {
    describe('when get user is called', () => {
      const updateUserDto: UpdateUserDto = {
        phoneNumber: '0842338168',
        password: 'HungTruong@',
        firstName: 'Hung',
        lastName: 'Truong',
        gender: Gender.male,
        birthday: '2002-05-23',
      };
      let user: any;
      beforeEach(async () => {
        user = await usersController.updateUserById(updateUserDto, 1);
      });

      it('then it should call userService', () => {
        expect(usersService.updateUserById).toBeCalledWith(updateUserDto, 1);
      });

      it('then it should return updated user', () => {
        expect(user).toEqual({
          message: 'Update user successfully',
          user: userStub,
        });
      });
    });
  });

  // it('should create a user', async () => {
  //   const dto = {
  //     phoneNumber: '0842338168',
  //     password: 'HungTruong@',
  //     firstName: 'Hung',
  //     lastName: 'Truong',
  //     gender: Gender.male,
  //     birthday: '2002-05-23',
  //   };
  //   expect(await usersController.createUser(dto)).toEqual({
  //     id: expect.any(Number),
  //     phoneNumber: dto.phoneNumber,
  //     password: dto.password,
  //     firstName: dto.firstName,
  //     lastName: dto.lastName,
  //     gender: dto.gender,
  //     birthday: dto.birthday,
  //   });

  //   expect(mockUsersService.createUser).toHaveBeenCalledWith(dto);
  // });

  // it('should update a user', async () => {
  //   const dto = {
  //     phoneNumber: '0842338168',
  //     password: 'HungTruong@',
  //     firstName: 'Hung',
  //     lastName: 'Truong',
  //     gender: Gender.male,
  //     birthday: '2002-05-23',
  //     point: 0,
  //     hoardingPoints: 0,
  //     otpCode: '1133',
  //     isCodeUsed: true,
  //     rank: Rank.bronze,
  //   };

  //   // expect(await usersController.updateUserById(dto, 1)).toEqual({
  //   //   message: 'Update user successfully',
  //   //   user: {
  //   //     id: 1,
  //   //     ...dto,
  //   //   },
  //   // });
  //   expect(await usersController.updateUserById(dto, 1)).toEqual({
  //     message: 'Update user successfully',
  //     user: {
  //       id: 1,
  //       ...dto,
  //     },
  //   });
  // });
});
