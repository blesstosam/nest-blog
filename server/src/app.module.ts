import { Module } from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';
import { ContentModule } from './content/content.module';
// import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.DB, {
      useNewUrlParser: true
    }),
    PostsModule,
    UserModule,
    ContentModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
