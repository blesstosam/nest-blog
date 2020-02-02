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