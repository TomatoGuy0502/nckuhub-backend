import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FavoriteEntity } from './entities/favorite.entity'

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity) private favoritesRepository: Repository<FavoriteEntity>
  ) {}

  async findUserFavorites(userId: string) {
    const data = await this.favoritesRepository.find({
      where: { userId },
      relations: ['course', 'course.department']
    })
    return data.map((favorite) => favorite.course)
  }

  async createUserFavorite(userId: string, courseId: string) {
    return await this.favoritesRepository.save({ courseId, userId })
  }

  async removeUserFavorite(userId: string, courseId: string) {
    return await this.favoritesRepository.delete({ userId, courseId })
  }
}
