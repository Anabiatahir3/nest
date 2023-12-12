import { Module } from '@nestjs/common';
import { UsersController } from './auth.controller';
import { UsersService } from './auth.service';
@Module({
    controllers:[UsersController],
    providers:[UsersService]
})
export class AuthModule{}