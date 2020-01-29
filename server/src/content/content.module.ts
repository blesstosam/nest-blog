import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import {Content} from './content.model'
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Content])],
  controllers: [ContentController]
})
export class ContentModule {}
