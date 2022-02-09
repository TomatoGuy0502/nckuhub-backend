import { Test, TestingModule } from '@nestjs/testing'
import { CreateFavoriteInput } from 'src/favorites/dto/create-favorite.input'
import { RemoveFavoriteInput } from 'src/favorites/dto/remove-favorite.input'
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity'
import { FavoritesService } from 'src/favorites/favorites.service'
import { DeleteResult } from 'typeorm'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'
import { UserEntity } from '../entities/user.entity'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'
import { mockUsersService, mockFavoritesService } from './mock.service'
import { userStub, favoriteStub, deleteResultStub } from './stub'

describe('UsersController', () => {
  let userController: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: FavoritesService, useValue: mockFavoritesService }
      ]
    }).compile()

    userController = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  describe('when findOne is called', () => {
    let user: Partial<UserEntity>

    beforeAll(async () => {
      user = await userController.findOne(userStub().id)
    })

    it('should call userService', () => {
      expect(mockUsersService.findOne).toBeCalledWith(userStub().id)
    })
    it('should return a user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('when findAll is called', () => {
    let users: Partial<UserEntity>[]

    beforeAll(async () => {
      users = await userController.findAll()
    })

    it('should call userService', () => {
      expect(mockUsersService.findAll).toBeCalled()
    })
    it('should return users', () => {
      expect(users).toEqual([userStub()])
    })
  })

  describe('when create is called', () => {
    let user: Partial<UserEntity>
    let createUserInput: CreateUserInput

    beforeAll(async () => {
      createUserInput = {
        displayName: userStub().displayName,
        email: userStub().email,
        facebookId: userStub().facebookId
      }
      user = await userController.create(createUserInput)
    })

    it('should call userService', () => {
      expect(mockUsersService.create).toBeCalledWith(createUserInput)
    })
    it('should return a user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('when update is called', () => {
    let user: Partial<UserEntity>
    let updateUserInput: UpdateUserInput

    beforeAll(async () => {
      updateUserInput = {
        displayName: 'updated name',
        email: 'newtest@gmail.com'
      }
      user = await userController.update(userStub().id, updateUserInput)
    })

    it('should call userService', () => {
      expect(mockUsersService.update).toBeCalledWith(userStub().id, updateUserInput)
    })
    it('should return a user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('when findUserFavorites is called', () => {
    let favorites: Partial<FavoriteEntity>[]

    beforeAll(async () => {
      favorites = await userController.findUserFavorites(favoriteStub().userId)
    })

    it('should call favoritesService', () => {
      expect(mockFavoritesService.findUserFavorites).toBeCalledWith(favoriteStub().userId)
    })
    it('should return favorites', () => {
      expect(favorites).toEqual([favoriteStub()])
    })
  })

  describe('when createUserFavorite is called', () => {
    let favorite: Partial<FavoriteEntity>
    let createFavoriteInput: CreateFavoriteInput

    beforeAll(async () => {
      createFavoriteInput = {
        courseId: favoriteStub().courseId
      }
      favorite = await userController.createUserFavorite(favoriteStub().userId, createFavoriteInput)
    })

    it('should call favoritesService', () => {
      expect(mockFavoritesService.createUserFavorite).toBeCalledWith(
        favoriteStub().userId,
        createFavoriteInput.courseId
      )
    })
    it('should return a favorite', () => {
      expect(favorite).toEqual(favoriteStub())
    })
  })

  describe('when deleteUserFavorite is called', () => {
    let result: DeleteResult
    let removeFavoriteInput: RemoveFavoriteInput

    beforeAll(async () => {
      removeFavoriteInput = {
        courseId: favoriteStub().courseId
      }
      result = await userController.deleteUserFavorite(favoriteStub().userId, removeFavoriteInput)
    })

    it('should call favoritesService', () => {
      expect(mockFavoritesService.removeUserFavorite).toBeCalledWith(
        favoriteStub().userId,
        removeFavoriteInput.courseId
      )
    })
    it('should return favorites', () => {
      expect(result).toEqual(deleteResultStub())
    })
  })
})
