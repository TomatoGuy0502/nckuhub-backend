import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(CreateUserInput: CreateUserInput): Promise<User> {
    const user = new User()
    user.facebookId = CreateUserInput.facebookId
    user.email = CreateUserInput.email
    user.displayName = CreateUserInput.displayName
    user.points = 0
    return await this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(userId: string): Promise<User> {
    return this.usersRepository.findOne(userId)
  }

  update(userId: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${userId} user`
  }

  remove(userId: string) {
    return `This action removes a #${userId} user`
  }
}
