import { News } from '../../news/news.interface';
import { Comment } from '../../news/comments/comments.interface';

export const renderNewsDetail = (
  news: News,
  comments: Comment[] | string,
): string => {
  const commentsIsNotExist = typeof comments === 'string';
  console.log(comments);
  return `
        <div class="container">
            <img src=${news.cover} alt="" />
            <h1>${news.title}</h1>
            <div>${news.description}</div>
            <div class="text-muted">
             <img src=${news.avatar} alt="avatar" />
            Автор: ${news.author}</div>
            
            ${
              comments && comments.length > 0 && !commentsIsNotExist
                ? renderNewsComments(comments)
                : 'Нет комментариев'
            }
        </div>
    `;
};

const renderNewsComments = (comments: Comment[]): string => {
  let html = '';
  for (const comment of comments) {
    html += `
            <div class="row">
                <div class="col-lg-1">
                    <div style="background-color: #ccc; width: 75px; height: 75px" class="rounded-circle"></div>
                </div>
                <div class="col-lg-8">
                    <div>${comment.author}</div>
                    <div>${comment.message}</div>
                </div>
            </div>
        `;
  }

  return html;
};