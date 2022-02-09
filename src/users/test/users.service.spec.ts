import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { UsersService } from '../users.service'

describe('UsersService', () => {
  let service: UsersService

  const mockUsersRepository = {
    create: jest.fn((dto) => ({ id: 'test', ...dto })),
    save: jest.fn((dto) => Promise.resolve({ id: 'test', ...dto })),
    findOne: jest.fn((entity) => Promise.resolve(entity))
  }

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

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new user record and return that', async () => {
    const dto = {
      displayName: 'test',
      email: 'test@gmail.com',
      facebookId: 'FBtest'
    }
    mockUsersRepository.findOne.mockReturnValue(Promise.resolve(undefined))
    expect(await service.create(dto)).toEqual({ id: expect.any(String), points: 0, ...dto })
  })

  it('should fail to create a duplicated user', async () => {
    const dto = {
      displayName: 'test',
      email: 'test@gmail.com',
      facebookId: 'FBtest'
    }
    mockUsersRepository.findOne.mockReturnValue(Promise.resolve({ id: 'test', points: 0, ...dto }))
    await expect(service.create(dto)).rejects.toThrow()
  })
})
