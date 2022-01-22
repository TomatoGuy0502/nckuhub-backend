import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UpdateCommentInput } from './dto/update-comment.input'
import { CommentEntity } from './entities/comment.entity'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity) private commentRepository: Repository<CommentEntity>
  ) {}

  create(userId: string, courseId: string, text: string, got: number, cold: number, sweet: number) {
    const comment = new CommentEntity()
    comment.userId = userId
    comment.courseId = courseId
    comment.text = text
    comment.got = got
    comment.cold = cold
    comment.sweet = sweet
    return this.commentRepository.save(comment)
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

  async update(commentId: string, updateCommentDto: UpdateCommentInput) {
    return await this.commentRepository.update(commentId, updateCommentDto)
  }

  async remove(commentId: string) {
    return await this.commentRepository.delete(commentId)
  }
}
