import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create.news.dto';
import { News, NewsEdit } from './news.interface';
import { renderNewsAll } from '../view/news/news-all';
import { renderTemplate } from '../view/template';
import { CommentsService } from './comments/comments.service';
import { renderNewsDetail } from '../view/news/news-detail';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from '../utils/HelperFileLoad';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

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
  @Get('/view/:id')
  getDetailView(@Param('id') id: string) {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);

    const content = renderNewsDetail(news, comments);

    return renderTemplate(content, {
      title: news.title,
      description: news.description,
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
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoad.destinationPath,
        filename: HelperFileLoad.customFileName,
      }),
    }),
  )
  create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
      news.avatar = PATH_NEWS + avatar.filename;
    }
    return this.newsService.create(news);
  }

  // create(@Body() createNewsDto: News) {
  //   return this.newsService.create(createNewsDto);
  // }

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
