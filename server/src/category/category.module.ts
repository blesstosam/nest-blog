import { Module } from '@nestjs/common';
import {Category} from './category.model'
import {CategoryController} from './category.controller'
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Category])],
  controllers: [CategoryController]
})
export class CategoryModule {}
