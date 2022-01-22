import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { CommentEntity } from './entities/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
