import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentInput) {
    return this.commentsService.create(createCommentDto)
  }

  @Get()
  findAll(@Query('userId') userId: string) {
    if (!userId) {
      return this.commentsService.findAll()
    }
    return this.commentsService.findAllByUserId(userId)
  }

  @Get(':commentId')
  findOne(@Param('commentId') commentId: string) {
    return this.commentsService.findOne(commentId)
  }

  @Patch(':commentId')
  update(@Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentInput) {
    return this.commentsService.update(commentId, updateCommentDto)
  }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId)
  }
}
