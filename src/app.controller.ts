import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiTags, ApiOperation} from '@nestjs/swagger'

@Controller()
@ApiTags('default')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({description: 'default'})
  getHello() {
    return {id: 1};
  }
}
