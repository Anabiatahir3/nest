import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { userAgent, userAgentMiddleware } from './middlewares/user-agent.middleware';
@Module({
  //question:whats the purpose of importing auth module when you cant use the auth service without explicitly mentioning export 
  //auth service in auth module
  imports: [AuthModule],
  controllers: [AppController],
  providers:[AppService]
 
  
})
export class AppModule implements NestModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(userAgent).forRoutes("auth")
  }
}
