export const mockUsersRepository = {
  create: jest.fn((dto) => ({ id: 'test', ...dto })),
  save: jest.fn((dto) => Promise.resolve({ id: 'test', ...dto })),
  findOne: jest.fn((entity) => Promise.resolve(entity))
}
