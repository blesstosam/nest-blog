import { Module } from '@nestjs/common';
import {UserController} from './user.controller'


import {TypegooseModule} from 'nestjs-typegoose'
import {User} from './user.model'

@Module({
  imports: [
    TypegooseModule.forFeature([User])
  ],
  controllers: [UserController]
})
export class UserModule {}
