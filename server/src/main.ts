require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import {ValidationPipe} from '@nestjs/common'

import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 解决跨域问题
  app.enableCors();

  app.use(cookieParser())

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const options = new DocumentBuilder()
    .setTitle('博客系统')
    .setDescription('后台管理接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.SERVER_PORT);

  console.log(`http://localhost:${process.env.SERVER_PORT}/api-docs`);
}
bootstrap();
