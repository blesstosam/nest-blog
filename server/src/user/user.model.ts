import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @prop({required: true})
  username!: string;

  // select - false: 从数据库查找出来默认不带该字段
  @prop({
    required: true, 
    // select: false
  })
  passward!: string;

  @prop({default: false})
  isAdmin: boolean
}