import { Controller, Get, Post, Body, Response, Res } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiProperty} from '@nestjs/swagger'
import {InjectModel} from 'nestjs-typegoose'
import {ReturnModelType} from '@typegoose/typegoose'
import {User} from './user.model'
import {CommonResponse} from '../types'
import {IsNotEmpty} from 'class-validator'
// import MD5 from 'md5.js'
import {Md5} from 'ts-md5/dist/md5'

export class CreateUserDto {
  @ApiProperty({description: '用户名', example: 'user1'})
  @IsNotEmpty({message: '缺少用户名'})
  username: string;

  @ApiProperty({description: '用户密码', example: 'pass1'})
  @IsNotEmpty({message: '缺少用户名密码'})
  passward: string;

  @ApiProperty({description: '用户是否是管理员', example: false})
  isAdmin?: boolean;
}

export class LoginUserDto {
  @ApiProperty({description: '用户名', example: 'user1'})
  @IsNotEmpty({message: '缺少用户名'})
  username: string;

  @ApiProperty({description: '用户密码', example: 'pass1'})
  @IsNotEmpty({message: '缺少用户名密码'})
  passward: string;
}

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {}

  @ApiOperation({description: '用户列表'})
  @Get('list')
  async index() {
    return this.userModel.find()
  }

  @ApiOperation({description: '注册用户'})
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto ): Promise<CommonResponse<boolean>>{
    // 查找数据库中是否存在该用户名
    const { username, passward } = createUserDto
    const res = await this.userModel.findOne({username})
    if (res) return {code: 500, msg: '用户名已存在', data: false}

    // 插入该用户名
    await this.userModel.create({...createUserDto, passward: Md5.hashStr(passward)})
    return {
      code: 200, msg: '用户名创建成功', data: true
    }
  }

  @ApiOperation({description: '用户登录'})
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Response() response): 
    Promise<CommonResponse<{username: string; isAdmin: boolean} | null>> {
      // console.log(res, res1, '00000')
      const {username, passward} = loginUserDto;
      try {
        const res = await this.userModel.findOne({username})
        console.log(res, 'res')
        if (!res) {
          return {code: 500, msg: '该用户不存在', data: null}
        }
        if (res.passward !== passward) {
          return {code: 500, msg: '密码不正确', data: null}
        }
        // set cookie
        const _data = {username: res.username, isAdmin: !!res.isAdmin}
        // response.cookies('user_info', JSON.stringify(_data));
        response.json({ code: 200, msg: '登录成功', data: _data })
      } catch (e) {
        console.log(e, 'e')
        response.json({ code: 500, msg: JSON.stringify(e), data: null})
      }

  }

  @ApiOperation({description: '用户退出'})
  @Post('logout')
  async logout(@Response() res): Promise<CommonResponse<boolean>> {
    // res.cookies.set('user_info', null);
    return { code: 200, msg: '退出成功', data: true }
  }



}
