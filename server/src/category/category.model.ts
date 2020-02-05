import { prop, modelOptions} from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Category {
  @ApiProperty({description: '分类名称', example: 'category1'})
  @prop({required: true})
  categoryTitle: string

  @ApiProperty({description: '分类描述', example: 'desc1'})
  @prop({default: ''})
  categoryDesc: string;
}