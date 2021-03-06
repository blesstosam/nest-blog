import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {Content} from './content.model'
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, Ref } from '@typegoose/typegoose';
import { ApiTags, ApiProperty, ApiOperation } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CommonResponse, CommonListResponse, PagerDto } from 'src/types';
import { User } from 'src/user/user.model';
import { Category } from 'src/category/category.model';

export class CreateContentDto {
  @ApiProperty({description: '用户id', example: '5e3002bef4b5d41f52cad5d0'})
  @IsNotEmpty({ message: '缺少用户id' })
  user: Ref<User>;

  @ApiProperty({description: '分类id', example: '5e3b7c4b5ed570b000135225'})
  @IsNotEmpty({ message: '缺少分类id' })
  category: Ref<Category>;

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
  async list(@Query() query: PagerDto): Promise<CommonListResponse>{
    let {pageNum = 1, pageSize = 10 } = query;
    // 将参数转化为number类型
    pageNum = Number(pageNum)
    pageSize = Number(pageSize)
    const total = await this.contentModel.count({})
    const res = await this.contentModel.find().skip((pageNum -1) * pageSize).limit(pageSize).populate(['category', 'user']);
    if (res) return {code: 200, msg: '获取成功', data: {total, list: res, pageNum, pageSize }}
    return {code: 500, msg: '获取失败', data: {total: 0, list: res, pageNum, pageSize}}
  }

  @ApiOperation({summary: '博客详情'})
  @Get(':id')
  async detail(@Param('id') id: string): Promise<CommonResponse> {
    const res =  await this.contentModel.findOne({_id: id}).populate(['category', 'user'])
    if (res) return {code: 200, msg: '获取成功', data: res}
    return {code: 500, msg: '获取成功', data: null}
  }

  @ApiOperation({summary: '创建博客'})
  @Post('create')
  async create(@Body() body: CreateContentDto): Promise<CommonResponse<boolean>> {
    const res = this.contentModel.create(body);
    if (res) return {code: 200, msg: '创建成功', data: true}
    return {code: 500, msg: '创建失败', data: false}
  }
}
