import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('DB_NAME') private config:Map<string,any>,private readonly authService:AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/get")
  private():object{
    return this.config
  }
  @Get("/haha")
  public(){
    return this.authService.findAll()
  }
  }
