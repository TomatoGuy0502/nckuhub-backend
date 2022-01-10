import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { CommentsModule } from './comments/comments.module'
import { CoursesModule } from './courses/courses.module'
import { FavoritesModule } from './favorites/favorites.module'

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, CommentsModule, CoursesModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
