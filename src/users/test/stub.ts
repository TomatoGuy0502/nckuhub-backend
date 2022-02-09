import { FavoriteEntity } from 'src/favorites/entities/favorite.entity'
import { UserEntity } from '../entities/user.entity'

export const userStub = (): Partial<UserEntity> => ({
  id: 'user-1',
  displayName: 'testUser',
  email: 'test@gmail.com',
  points: 0,
  facebookId: 'fbtestid'
})

export const favoriteStub = (): Partial<FavoriteEntity> => ({
  id: 'favorite-1',
  userId: 'user-1',
  courseId: 'course-1'
})

export const deleteResultStub = () => ({
  raw: '',
  affected: 1
})
