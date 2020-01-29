import { HttpService } from '../util';
import { baseUrl } from '../server';
import { AjaxResponse } from '@/types';

export const httpInstance = new HttpService(baseUrl);

export function login(param: { username: string; password: string }): Promise<AjaxResponse> {
  return httpInstance.post('/user/login', param);
}

export function contentList(param: { pageSize: number; pageNum: number }): Promise<AjaxResponse> {
  return httpInstance.get('/content/list', param);
}
