import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'
import { UserEntity } from '../entities/user.entity'
import { UsersService } from '../users.service'
import { mockUsersRepository } from './mock.repository'
import { userStub } from './stub'

describe('UsersService', () => {
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository
        }
      ]
    }).compile()

    usersService = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(usersService).toBeDefined()
  })

  describe('when create is called', () => {
    const createUserInput: CreateUserInput = {
      displayName: userStub().displayName,
      email: userStub().email,
      facebookId: userStub().facebookId
    }

    describe('with new user', () => {
      let user: Partial<UserEntity>

      beforeAll(async () => {
        jest.clearAllMocks()
        mockUsersRepository.findOne.mockResolvedValue(undefined)
        user = await usersService.create(createUserInput)
      })

      it('should call usersRepository to check if user exists', () => {
        expect(mockUsersRepository.findOne).toBeCalledWith({ email: createUserInput.email })
      })
      it('should call usersRepository to save a new user', () => {
        expect(mockUsersRepository.save).toBeCalledTimes(1)
      })
      it('should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })

    describe('with already existing user', () => {
      beforeAll(async () => {
        jest.clearAllMocks()
        mockUsersRepository.findOne.mockResolvedValue(userStub())
      })

      it('should fail to create user and throw error', async () => {
        await expect(usersService.create(createUserInput)).rejects.toThrow()
      })

      it('should call usersRepository to check if user exists', () => {
        expect(mockUsersRepository.findOne).toBeCalledWith({ email: createUserInput.email })
      })
    })
  })

  describe('when findAll is called', () => {
    let users: Partial<UserEntity>[]

    beforeAll(async () => {
      jest.clearAllMocks()
      users = await usersService.findAll()
    })

    it('should call usersRepository', () => {
      expect(mockUsersRepository.find).toBeCalled()
    })
    it('should return all users', () => {
      expect(users).toEqual([userStub()])
    })
  })

  describe('when findOne is called', () => {
    let user: Partial<UserEntity>
    const userId = userStub().id

    beforeAll(async () => {
      jest.clearAllMocks()
      user = await usersService.findOne(userId)
    })

    it('should call usersRepository to check if user exists', () => {
      expect(mockUsersRepository.findOne).toBeCalledWith(userId)
    })
    it('should return a specific user', () => {
      expect(user).toEqual(userStub())
    })
  })

  describe('when update is called', () => {
    const updateUserInput: UpdateUserInput = {
      displayName: 'updated name',
      email: 'newtest@gmail.com'
    }

    describe('with existing user', () => {
      let user: Partial<UserEntity>
      const userId = userStub().id
      const mockedValue = { ...userStub(), ...updateUserInput }

      beforeAll(async () => {
        jest.clearAllMocks()
        mockUsersRepository.save.mockResolvedValue(mockedValue)
        user = await usersService.update(userId, updateUserInput)
      })

      it('should call usersRepository to check if user exists', () => {
        expect(mockUsersRepository.findOne).toBeCalledWith(userId)
      })
      it('should return a updated user', () => {
        expect(user).toEqual(mockedValue)
      })
    })

    describe('with non existing user', () => {
      beforeAll(async () => {
        jest.clearAllMocks()
        mockUsersRepository.findOne.mockResolvedValue(undefined)
      })

      it('should fail to update user and throw error', async () => {
        await expect(usersService.update('non existing id', updateUserInput)).rejects.toThrow()
      })
      it('should call usersRepository to check if user exists', () => {
        expect(mockUsersRepository.findOne).toBeCalledWith('non existing id')
      })
    })
  })
})
