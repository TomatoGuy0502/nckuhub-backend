import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId)
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateUserInput: UpdateUserInput) {
    return this.usersService.update(userId, updateUserInput)
  }
}
