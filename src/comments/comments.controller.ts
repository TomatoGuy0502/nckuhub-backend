import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentInput: CreateCommentInput) {
    return this.commentsService.create(createCommentInput)
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
  update(@Param('commentId') commentId: string, @Body() updateCommentInput: UpdateCommentInput) {
    return this.commentsService.update(commentId, updateCommentInput)
  }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsService.remove(commentId)
  }
}
