import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Post as PostSchema } from './posts.model';
import {IsNotEmpty} from 'class-validator'

import {InjectModel} from 'nestjs-typegoose'
import { ModelType } from '@typegoose/typegoose/lib/types';

// 不能用interface
class CreatePostDto {
  @ApiProperty({description: '标题', example: '帖子标题'})
  @IsNotEmpty({message: '请填写标题'})
  title: string;

  @ApiProperty({description: '内容', example: '帖子内容'})
  @IsNotEmpty({message: '请填写内容'})
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(@InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>) {}

  @Get()
  @ApiOperation({description: '帖子列表'})
  async index() {
    return await this.postModel.find()
  }

  @Post()
  @ApiOperation({description: '创建帖子'})
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postModel.create(createPostDto);
    return {
      success: true
    }
  }

  @Get(':id')
  @ApiOperation({description: '帖子详情'})
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({description: '编辑帖子'})
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await this.postModel.findByIdAndUpdate(id, updatePostDto)
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({description: '删除帖子'})
  async remove(@Param('id') id: string) {
    await this.postModel.findByIdAndRemove(id)
    return {
      success: true
    }
  }
}
