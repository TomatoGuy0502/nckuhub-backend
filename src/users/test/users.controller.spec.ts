import { Test, TestingModule } from '@nestjs/testing'
import { FavoritesService } from 'src/favorites/favorites.service'
import { v4 as uuidv4 } from 'uuid'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'

describe('UsersController', () => {
  let controller: UsersController

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: uuidv4(),
        ...dto
      }
    }),
    update: jest.fn((id, dto) => ({
      id,
      ...dto
    }))
  }
  const mockFavoritesService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: FavoritesService, useValue: mockFavoritesService }
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a user', () => {
    const dto = {
      displayName: 'test',
      email: 'test@gmail.com',
      facebookId: 'test'
    }
    expect(controller.create(dto)).toEqual({ id: expect.any(String), ...dto })
  })

  it('should update a user', () => {
    const dto = {
      displayName: 'test',
      email: 'test@gmail.com',
      facebookId: 'test'
    }

    expect(controller.update('test', dto)).toEqual({ id: 'test', ...dto })
  })
})
