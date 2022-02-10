import { userStub } from './stub'

export const mockUsersRepository = {
  save: jest.fn(() => Promise.resolve(userStub())),
  findOne: jest.fn(() => Promise.resolve(userStub())),
  find: jest.fn(() => Promise.resolve([userStub()]))
}
