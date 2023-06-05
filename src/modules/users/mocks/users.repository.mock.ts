import { foundUserStub, userStub } from '../test/stubs/user.stub';

export const mockUsersRepository = {
  findAll: jest.fn().mockResolvedValue([userStub]),
  findOne: jest.fn().mockResolvedValue(foundUserStub),
  create: jest.fn().mockResolvedValue(userStub),
  destroy: jest.fn(),
};
