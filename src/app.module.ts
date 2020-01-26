import { Module } from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/nest-blog-api', {
      useNewUrlParser: true
    }),
    PostsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
