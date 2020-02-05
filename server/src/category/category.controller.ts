import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiProperty } from '@nestjs/swagger';
import {Category} from './category.model'
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CommonResponse, CommonListResponse, PagerDto } from 'src/types';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({description: '分类名称', example: 'category1'})
  @IsNotEmpty({ message: '缺少名称' })
  categoryTitle: string;

  @ApiProperty({description: '分类描述', example: 'categorydesc'})
  categoryDesc: string
}

@ApiTags('文章分类')
@Controller('category')
export class CategoryController {
  constructor(@InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>) { }

  @Get('list')
  @ApiOperation({summary: '分类列表'})
  async index(@Query() query: PagerDto): Promise<CommonListResponse> {
    let {pageNum = 1, pageSize = 10 } = query;
    // 将参数转化为number类型
    pageNum = Number(pageNum)
    pageSize = Number(pageSize)
    const total = await this.categoryModel.count({})
    const res = await this.categoryModel.find().skip((pageNum -1) * pageSize).limit(pageSize);
    if (res) return {code: 200, msg: '获取成功', data: {total, list: res, pageNum, pageSize }}
    return {code: 500, msg: '获取失败', data: {total: 0, list: res, pageNum, pageSize}}
  }

  @ApiOperation({summary: '创建分类'})
  @Post('create')
  async create(@Body() body: CreateCategoryDto): Promise<CommonResponse<boolean>> {
    const res = this.categoryModel.create(body);
    if (res) return {code: 200, msg: '创建成功', data: true}
    return {code: 500, msg: '创建失败', data: false}
  }
}
