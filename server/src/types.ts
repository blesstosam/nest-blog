import { ApiProperty } from "@nestjs/swagger";

export interface CommonResponse<T = any> {
  code: number;
  msg: string;
  data: T
}

export interface CommonListResponse<T = any> {
  code: number;
  msg: string;
  data: {total: number; pageSize: number; pageNum: number; list: Array<T>}
}

export interface Pager {
  current: number;
  pageSize: number;
  total: number;
}

export class PagerDto {
  @ApiProperty({description: '页数', example: 10})
  pageSize: number; 
  
  @ApiProperty({description: '页码', example: 1})
  pageNum: number
}