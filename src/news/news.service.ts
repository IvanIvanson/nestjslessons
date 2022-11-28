import { Injectable } from '@nestjs/common';
import { News, AllNews, NewsEdit } from './news.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { CreateNewsDto } from './create.news.dto';
// import { CreateNewsDto } from './create.news.dto';




export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

@Injectable()
export class NewsService {
  usersService: any;
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
) {}
   async create(news: CreateNewsDto, userId: number): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    const _user = await this.usersService.findById(userId);
    newsEntity.user = _user;
    return this.newsRepository.save(newsEntity);
  }

  findById(id: News['id']): Promise<NewsEntity> {
    return this.newsRepository.findOne(
      { id },
      { relations: ['user', 'comments', 'comments.user'] },
    );
  }

  getAll(): Promise<NewsEntity[]> {
    return this.newsRepository.find({});
  }

  async edit(id: number, news: NewsEdit): Promise<NewsEntity | null> {
    const editableNews = await this.findById(id);
    if (editableNews) {
      const newsEntity = new NewsEntity();
      newsEntity.title = news.title || editableNews.title;
      newsEntity.description = news.description || editableNews.description;
      newsEntity.cover = news.cover || editableNews.cover;

      return this.newsRepository.save(newsEntity);
    }
    return null;
  }

  async remove(id): Promise<NewsEntity | null> {
    const removeNews = await this.findById(id);
    if (removeNews) {
      return this.newsRepository.remove(removeNews);
    }
    return null;
  }
}


  private readonly news: AllNews = {
    1: {
      id: 1,
      title: 'Наша первая новость',
      description: 'Описание первой новости',
      author: 'Ivan',
      countView: 12,
      cover: 'https://scientificrussia.ru/images/b/teb-full.jpg',
      avatar:
        'https://kartinkof.club/uploads/posts/2022-05/1653683364_1-kartinkof-club-p-veselie-kartinki-na-avatarku-vatsap-1.jpg',
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

function getAllNews() {
  throw new Error('Function not implemented.');
}

function remove(id: any, arg1: number) {
  throw new Error('Function not implemented.');
}

function edit(id: any, arg1: number, newsEdit: any, NewsEdit: any) {
  throw new Error('Function not implemented.');
}

