import { Controller, Get, Post, Body } from '@nestjs/common';
import {Content} from './content.model'
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags, ApiProperty, ApiOperation } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateContentDto {
  @ApiProperty({description: '用户id', example: '5e3002bef4b5d41f52cad5d0'})
  @IsNotEmpty({ message: '缺少用户id' })
  user: string;

  @ApiProperty({description: '内容标题', example: 'title1'})
  @IsNotEmpty({ message: '缺少内容标题' })
  title: string

  @ApiProperty({description: '内容简介', example: 'desc1'})
  desc: string;

  @ApiProperty({description: '内容正文', example: 'content1'})
  @IsNotEmpty({ message: '缺少内容正文' })
  content: string;

  @ApiProperty({description: '阅读量', example: 0})
  views: number;

  @ApiProperty({description: '评论', example: []})
  comments: Array<any>
}

@ApiTags('内容')
@Controller('content')
export class ContentController {
  constructor(@InjectModel(Content) private readonly contentModel: ReturnModelType<typeof Content>) { }

  @ApiOperation({summary: '博客列表'})
  @Get('list')
  async list() {
    return await this.contentModel.find()
  }

  @ApiOperation({summary: '创建博客'})
  @Post('create')
  async create(@Body() body: CreateContentDto) {
    return this.contentModel.create(body);
  }
}
