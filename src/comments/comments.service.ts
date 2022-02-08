import { Injectable } from '@nestjs/common'
import { DeleteResult, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'
import { CommentEntity } from './entities/comment.entity'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>
  ) {}

  create(commentData: CreateCommentInput): Promise<CommentEntity> {
    return this.commentRepository.save(commentData)
  }

  findAll(): Promise<CommentEntity[]> {
    return this.commentRepository.find()
  }

  findAllByUserId(userId: string): Promise<CommentEntity[]> {
    return this.commentRepository.find({
      where: { userId },
      relations: ['course', 'course.department']
    })
  }

  findOne(commentId: string): Promise<CommentEntity> {
    return this.commentRepository.findOne(commentId)
  }

  async update(commentId: string, commentData: UpdateCommentInput): Promise<CommentEntity> {
    const commentToUpdate = await this.commentRepository.findOne(commentId)

    return await this.commentRepository.save({
      ...commentToUpdate,
      ...commentData
    } as CommentEntity)
  }

  async remove(commentId: string): Promise<DeleteResult> {
    return await this.commentRepository.delete(commentId)
  }
}
