import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { FavoritesService } from 'src/favorites/favorites.service'
import { CreateFavoriteInput } from 'src/favorites/dto/create-favorite.input'
import { RemoveFavoriteInput } from 'src/favorites/dto/remove-favorite.input'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private favoritesService: FavoritesService) {}

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

  @Get(':userId/favorites')
  findUserFavorites(@Param('userId') userId: string) {
    return this.favoritesService.findUserFavorites(userId)
  }

  @Post(':userId/favorites')
  createUserFavorite(
    @Param('userId') userId: string,
    @Body() createFavoriteInput: CreateFavoriteInput
  ) {
    const { courseId } = createFavoriteInput
    return this.favoritesService.createUserFavorite(userId, courseId)
  }

  @Delete(':userId/favorites')
  deleteUserFavorite(
    @Param('userId') userId: string,
    @Body() removeFavoriteInput: RemoveFavoriteInput
  ) {
    const { courseId } = removeFavoriteInput
    return this.favoritesService.removeUserFavorite(userId, courseId)
  }
}
