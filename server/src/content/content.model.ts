import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Content {
  //关联字段--内容分类的id
  // category: {
  //   //类型
  //   type: mongoose.Schema.Types.ObjectId,
  //   //引用
  //   ref: 'Category'
  // }

  //关联字段--用户的id
  @prop({
    ref: 'User',
    // localField: '_id'
  })
  user: Ref<User>

  @ApiProperty({description: '内容标题', example: 'title1'})
  @prop({required: true})
  title: string

  @ApiProperty({description: '内容简介', example: 'desc1'})
  @prop({default: ''})
  desc: string;

  @ApiProperty({description: '内容正文', example: 'content1'})
  @prop({default: '', required: true})
  content: string;

  @ApiProperty({description: '阅读量', example: 0})
  @prop({default: 0})
  views: number;

  @ApiProperty({description: '评论', example: []})
  @arrayProp({itemsRef: 'Array'})
  comments: Array<any>
}