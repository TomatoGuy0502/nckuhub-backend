import { CourseEntity } from 'src/courses/entities/course.entity'
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity'
import { UserEntity } from '../entities/user.entity'

export const userStub = (): Partial<UserEntity> => ({
  id: 'user-1',
  displayName: 'testUser',
  email: 'test@gmail.com',
  points: 0,
  facebookId: 'fbtestid'
})

export const courseStub = (): Partial<CourseEntity> => ({
  id: 'course-1',
  courseCode: 1,
  name: 'Test course',
  teacher: 'Bob',
  time: '三[1-2]',
  credit: 2,
  commentsCount: 0,
  semester: '110',
  department: {
    id: 'department-1',
    name: 'Department 1',
    departmentCode: 'DEP1',
    course: []
  }
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
