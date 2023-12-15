import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { ExampleService } from './example.service';
@Module({
    controllers:[AuthController],
    providers:[AuthService,ExampleService,{
        provide:APP_INTERCEPTOR, useClass:LoggerInterceptor},
        {provide:
            "DB_NAME",useValue:{
              name:"postgres",
              age:"82"
            }
        },
        { provide:
            'Options',useValue:["Thunder Client"]
          }
            
          
    ],
    exports:['DB_NAME',"Options",AuthService] //we can only use providers outside if we have exported them
})
export class AuthModule{}