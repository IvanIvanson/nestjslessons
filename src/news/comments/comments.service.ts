import { Injectable } from '@nestjs/common';
import { Comment, CommentEdit, Comments } from './comments.interface';
import { getRandomInt } from '../news.service';
import { CreateCommentDto } from './dto/create.comment.dto';
@Injectable()
export class CommentsService {
  // edit(
  //   newsId: string | number,
  //   commentId: string | number,
  //   comment: Partial<Comment>,
  // ) {
  //   throw new Error('Method not implemented.');
  // }
  // getAllComments() {
  //   throw new Error('Method not implemented.');
  // }
  private readonly comments: Comments = {
    1: [
      {
        id: 123,
        message: 'Мой первый комментарий',
        author: 'Вася',
      },
    ],
  };

  find(newsId: string | number): Comment[] | string {
    if (this.comments[newsId]) {
      return this.comments[newsId];
    }

    return 'Comment not found!';
  }

  create(newsId: string | number, comment: Comment): string {
    const id = getRandomInt(0, 10000) as string | number;

    if (!this.comments[newsId]) {
      this.comments[newsId] = [];
    }

    this.comments[newsId].push({ id, ...comment });
    return 'Comment create';
  }

  remove(
    newsId: string | number,
    commentId: string | number,
  ): null | Comment[] {
    if (!this.comments[newsId]) {
      return null;
    }

    const indexComment = this.comments[newsId].findIndex(
      (comment) => comment.id === +commentId,
    );

    if (indexComment === -1) {
      return null;
    }

    return this.comments[newsId].splice(indexComment, 1);
  }
  edit(
    newsId: string | number,
    commentId: string | number,
    comment: CommentEdit,
  ): boolean | Comment {
    console.log('commentId', commentId);
    if (!this.comments[newsId]) {
      return false;
    }

    const indexComment = this.comments[newsId].findIndex(
      (comment) => comment.id === commentId,
    );

    if (indexComment === -1) {
      return false;
    }
    this.comments[newsId][indexComment] = {
      ...this.comments[newsId][indexComment],
      ...comment,
    };
    return this.comments[newsId][indexComment];
  }
}
