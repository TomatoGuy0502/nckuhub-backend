import { favoriteStub } from 'src/users/test/stub'
import { deleteResultStub } from './stub'

export const mockFavoritesRepository = {
  save: jest.fn(() => Promise.resolve(favoriteStub())),
  find: jest.fn((x) => Promise.resolve(x)),
  delete: jest.fn(() => Promise.resolve(deleteResultStub()))
}
