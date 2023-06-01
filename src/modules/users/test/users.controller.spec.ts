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

  describe('updateUserById', () => {
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

      it('then it should return updated user and message update successfully', () => {
        expect(user).toEqual({
          message: 'Update user successfully',
          user: userStub,
        });
      });
    });
  });

  describe('deleteUserById', () => {
    describe('when get user is called', () => {
      let user: any;
      beforeEach(async () => {
        user = await usersController.deleteUserById(1);
      });

      it('then it should call userService', () => {
        expect(usersService.deleteUserById).toBeCalledWith(1);
      });

      it('then it should return message delete successfully', () => {
        expect(user).toEqual({ message: 'Delete user successfully' });
      });
    });
  });
});
