import { favoriteStub, userStub, deleteResultStub, courseStub } from './stub'

export const mockUsersService = {
  create: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
  findOne: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()])
}
export const mockFavoritesService = {
  findUserFavorites: jest.fn().mockResolvedValue([courseStub()]),
  createUserFavorite: jest.fn().mockResolvedValue(favoriteStub()),
  removeUserFavorite: jest.fn().mockResolvedValue(deleteResultStub())
}
