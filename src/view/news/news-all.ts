// import { renderComments } from './news-all';
import { Comment } from '../../news/comments/comments.interface';
import { AllNews, News } from 'src/news/news.interface';

export const renderNewsAll = (news: AllNews): string => {
  let newsListHtml = '';
 
 
  
  for (const newsItem in news) {
    newsListHtml += renderNewsBlock(news[newsItem]);
  }
  
  return `
    <h1 class='text-danger text-center'>Список новостей</h1>
    <div class="row">
        ${newsListHtml}
          </div>
    `;
}

export const renderComment = (comments: Comment[]): string => {
  let commentListHtml = '';
  
  for (const comment of comments) {
    commentListHtml += `
          <div class="col-lg-4 mb-2">
          <h6 class="card-title text-center text-primary">${comment.author}</h6>
          <p class="card-text text-info">${comment.message}</p>

          </div>;
          `
  }
  return commentListHtml;
}



export const renderNewsBlock = (news: News) => {
    
  return (
       `
    <div class="col-lg-4 mb-2">
        <div class="card">
             <img src=${news.cover} class="card-img-top img-fluid" alt="cat" />
            <div class="card-body">
                <h5 class="card-title text-center text-primary">${news.title}</h5>
               
                <div style="display:flex;justify-content:space-between;align-items:center; width:20%;">
  <img src=${news.avatar} class="rounded img-fluid" style="width:70px;" alt="avatar" />
                 <h6 class="card-subtitle mb-2 text-muted text-warning">${news.author}</h6>
                </div>
               <p class="card-text text-info">${news.description}</p>
                 
            </div>
        </div>
    </div>
    
    ` 
  );
}
