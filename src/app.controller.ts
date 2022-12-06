import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtCookie } from './auth/jwt.decorator';
type NewType = string;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(@JwtCookie() jwt): NewType {
    console.log(jwt);
    return this.appService.getHello();
  }

  @Get()
  @Render('index')
  root() {
    return {
      messages: [{ message: 'Hello', author: 'Ivan' }, { message: 'World' }],
    };
  }
}
