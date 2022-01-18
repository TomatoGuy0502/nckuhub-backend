import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  create(createCommentDto: CreateCommentInput) {
    const comment = new Comment()
    comment.text = createCommentDto.text
    comment.got = createCommentDto.got
    comment.cold = createCommentDto.cold
    comment.sweet = createCommentDto.sweet
    comment.userId = createCommentDto.userId
    comment.courseId = createCommentDto.courseId
    return this.commentRepository.save(comment)
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find()
  }

  findAllByUserId(userId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { userId },
      relations: ['course', 'course.department']
    })
  }

  findOne(commentId: string): Promise<Comment> {
    return this.commentRepository.findOne(commentId)
  }

  async update(commentId: string, updateCommentDto: UpdateCommentInput) {
    return await this.commentRepository.update(commentId, updateCommentDto)
  }

  async remove(commentId: string) {
    return await this.commentRepository.delete(commentId)
  }
}
