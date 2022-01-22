import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

  async create(
    displayName: string,
    email: string,
    facebookId: string,
    points = 0
  ): Promise<UserEntity> {
    const user = new UserEntity()
    user.displayName = displayName
    user.facebookId = facebookId
    user.email = email
    user.points = points
    return await this.usersRepository.save(user)
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find()
  }

  findOne(userId: string): Promise<UserEntity> {
    return this.usersRepository.findOne(userId)
  }

  async update(userId: string, displayName?: string, email?: string) {
    return await this.usersRepository.save({
      id: userId,
      displayName,
      email
    })
  }
}
