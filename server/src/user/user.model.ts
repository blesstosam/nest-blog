import { prop, modelOptions } from '@typegoose/typegoose'

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
  password!: string;

  @prop({default: false})
  isAdmin: boolean;
}