import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CourseEntity } from 'src/courses/entities/course.entity'
import { DeleteResult } from 'typeorm'
import { FavoriteEntity } from '../entities/favorite.entity'
import { FavoritesService } from '../favorites.service'
import { mockFavoritesRepository } from './mock.repository'
import { courseStub, deleteResultStub, departmentStub, favoriteStub, userStub } from './stub'

describe('FavoritesService', () => {
  let favoritesService: FavoritesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(FavoriteEntity),
          useValue: mockFavoritesRepository
        }
      ]
    }).compile()

    favoritesService = module.get<FavoritesService>(FavoritesService)
  })

  it('should be defined', () => {
    expect(favoritesService).toBeDefined()
  })

  describe('when findUserFavorites is called', () => {
    let favoriteCourses: Partial<CourseEntity>[]
    const userId = userStub().id
    const mockedValue = {
      ...favoriteStub(),
      course: { ...courseStub(), department: departmentStub() }
    }

    beforeAll(async () => {
      jest.clearAllMocks()
      mockFavoritesRepository.find.mockResolvedValue([mockedValue])
      favoriteCourses = await favoritesService.findUserFavorites(userId)
    })

    it(`should call favoritesRepository to get user's favorite courses`, () => {
      expect(mockFavoritesRepository.find).toBeCalledWith({
        where: { userId },
        relations: ['course', 'course.department']
      })
    })
    it('should return favorite courses', () => {
      expect(favoriteCourses).toEqual([mockedValue.course])
    })
  })

  describe('when createUserFavorite is called', () => {
    let favorite: Partial<FavoriteEntity>
    const userId = userStub().id
    const courseId = courseStub().id

    beforeAll(async () => {
      jest.clearAllMocks()
      mockFavoritesRepository.save.mockResolvedValue(favoriteStub())
      favorite = await favoritesService.createUserFavorite(userId, courseId)
    })

    it(`should call favoritesRepository to save user's favorite`, () => {
      expect(mockFavoritesRepository.save).toBeCalledWith({ userId, courseId })
    })
    it('should return favorite', () => {
      expect(favorite).toEqual(favoriteStub())
    })
  })

  describe('when removeUserFavorite is called', () => {
    let deleteResult: DeleteResult
    const userId = userStub().id
    const courseId = courseStub().id

    beforeAll(async () => {
      jest.clearAllMocks()
      mockFavoritesRepository.delete.mockResolvedValue(deleteResultStub())
      deleteResult = await favoritesService.removeUserFavorite(userId, courseId)
    })

    it(`should call favoritesRepository to delete user's favorite`, () => {
      expect(mockFavoritesRepository.delete).toBeCalledWith({ userId, courseId })
    })
    it('should return deleteResult', () => {
      expect(deleteResult).toEqual(deleteResultStub())
    })
  })
})
