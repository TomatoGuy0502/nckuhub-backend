import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFavoriteInput } from './dto/create-favorite.input'
import { RemoveFavoriteInput } from './dto/remove-favorite.input'
import { Favorite } from './entities/favorite.entity'

@Injectable()
export class FavoritesService {
  constructor(@InjectRepository(Favorite) private favoritesRepository: Repository<Favorite>) {}

  async findUserFavorites(userId: string) {
    const data = await this.favoritesRepository.find({
      where: { userId },
      relations: ['course', 'course.department']
    })
    return data.map((favorite) => favorite.course)
  }

  async createUserFavorite(userId: string, createFavoriteInput: CreateFavoriteInput) {
    const { courseId } = createFavoriteInput
    return await this.favoritesRepository.save({ courseId, userId })
  }

  async removeUserFavorite(userId: string, removeFavoriteInput: RemoveFavoriteInput) {
    const { courseId } = removeFavoriteInput
    return await this.favoritesRepository.delete({ userId, courseId })
  }
}
