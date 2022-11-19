import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NewsService } from './news.service';
// import { CreateNewsDto } from './dto/create.news.dto';
import { News, NewsEdit } from './news.interface';
import { renderNewsAll } from './view/news/news-all';
// import { renderComment } from './view/news/news-all';
import { renderTemplate } from './view/template';
import { CommentsService } from './comments/comments.service';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get()
  getNews() {
    return this.newsService.getAllNews();
  }

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAllNews();
    const content = renderNewsAll(news);
    // const comment = this.commentsService.getAllComments();
    return renderTemplate(content, {
      title: 'Список новостей',
      description: 'Описание полученной новости',
    });
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);
    return {
      ...news,
      comments,
    };
  }

  @Post()
  create(@Body() createNewsDto: News) {
    return this.newsService.create(createNewsDto);
  }

  @Patch('/:id')
  edit(@Param('id') id: number, @Body() news: NewsEdit) {
    return this.newsService.edit(id, news);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    const isRemoved = this.newsService.remove(id);

    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
  }
}
