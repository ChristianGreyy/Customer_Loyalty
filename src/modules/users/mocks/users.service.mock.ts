import { userStub } from '../test/stubs/user.stub';

export const mockUsersService = {
  getUserById: jest.fn().mockResolvedValue(userStub),
  getUsers: jest.fn().mockResolvedValue([userStub]),
  createUser: jest.fn().mockResolvedValue(userStub),
  updateUserById: jest.fn().mockResolvedValue(userStub),
  deleteUserById: jest.fn().mockImplementation(),
};
