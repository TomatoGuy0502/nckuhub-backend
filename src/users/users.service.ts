import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

  async create(userData: CreateUserInput): Promise<UserEntity> {
    const userExist = await this.usersRepository.findOne({ email: userData.email })
    if (userExist) {
      throw new ConflictException({ status: HttpStatus.CONFLICT, error: '使用者已存在' })
    }

    const user = new UserEntity()
    user.displayName = userData.displayName
    user.facebookId = userData.facebookId
    user.email = userData.email
    user.points = 0
    return this.usersRepository.save(user)
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find()
  }

  findOne(userId: string): Promise<UserEntity> {
    return this.usersRepository.findOne(userId)
  }

  async update(userId: string, userData: UpdateUserInput): Promise<UserEntity> {
    const userToUpdate = await this.usersRepository.findOne(userId)

    return await this.usersRepository.save({
      ...userToUpdate,
      ...userData
    } as UserEntity)
  }
}
