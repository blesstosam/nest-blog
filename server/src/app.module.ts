import { Module } from '@nestjs/common';
import {TypegooseModule} from 'nestjs-typegoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.DB, {
      useNewUrlParser: true
    }),
    PostsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
