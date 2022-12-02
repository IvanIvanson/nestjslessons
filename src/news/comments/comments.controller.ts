import { CommentsService } from './comments.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Comment, Comments } from './comments.interface';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get('/:newsid')
  get(@Param('newsid') newsId: string | number) {
    return this.commentService.find(newsId);
  }
  @Post('/:newsid')
  create(
    @Param('newsid') newsId: string | number,
    @Body() comment: Comments | Comment | CreateCommentDto,
  ) {
    return newFunction();

    function newFunction() {
      return this.commentService.create(newsId, comment);
    }
  }
  @Delete('/:newsid/:commentId')
  remove(
    @Param('newsid') newsId: string | number,
    @Param('commentId') commentId: string | number,
  ) {
    return this.commentService.remove(newsId, commentId);
  }

  @Patch('/:newsId/:commentId')
  edit(
    @Param('newsId') newsId: string | number,
    @Param('commentId') commentId: string | number,
    @Body() comment: EditCommentDto,
  ) {
    return this.commentService.edit(newsId, commentId, comment);
  }
}
