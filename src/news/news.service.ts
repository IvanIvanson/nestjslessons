import { Injectable } from '@nestjs/common';
import { News, AllNews, NewsEdit } from './news.interface';
// import { CreateNewsDto } from './create.news.dto';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

@Injectable()
export class NewsService {
  private readonly news: AllNews = {
    1: {
      id: 1,
      title: 'Наша первая новость',
      description: 'Уррааа! Наша первая новость',
      author: 'Ivan',
      createdAt: new Date(),
      countView: 12,
    },
  };

  getAllNews(): AllNews {
    return this.news;
  }

  find(id: number | string): News | undefined {
    return this.news[id];
    // return this.news.find((news) => news.id === id);
  }

  create(news: News): News {
    const id = getRandomInt(0, 10000) as string | number;
    const newNews: News = { id: '1', ...news } as News;
    this.news[id] = newNews;
    return newNews;
    // const newNews = {
    //   ...news,
    //   id: newId,
    // } as any as News;

    // this.news.push(newNews);
  }

  remove(id: number | string): boolean {
    if (this.news[id]) {
      delete this.news[id];
      return true;
    }

    return false;
  }

  edit(id: number | string, newsEdit: NewsEdit): News | string {
    if (this.news[id]) {
      this.news[id] = {
        ...this.news[id],
        ...newsEdit,
      };
      return this.news[id];
    }

    return 'News not found!';
  }
}
