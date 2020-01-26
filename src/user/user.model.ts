import { prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class User {
  @prop({required: true})
  username!: string;

  @prop({required: true})
  passward!: string;

  @prop({default: false})
  isAdmin: boolean
}