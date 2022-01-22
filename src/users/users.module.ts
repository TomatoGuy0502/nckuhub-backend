import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserEntity } from './entities/user.entity'
import { FavoritesModule } from 'src/favorites/favorites.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FavoritesModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
