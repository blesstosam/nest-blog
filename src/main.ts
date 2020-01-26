import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {ValidationPipe} from '@nestjs/common'

import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'debug']
  });

  const options = new DocumentBuilder()
    .setTitle('博客系统')
    .setDescription('后台管理接口')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser())

  await app.listen(3000);

  console.log('http://localhost:3000/api-docs');
}
bootstrap();
