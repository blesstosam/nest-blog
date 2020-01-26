export interface CommonResponse<T = any> {
  code: number;
  msg: string;
  data: T
}