import { HttpService } from '../util';
import { baseUrl } from '../server';
import { AjaxResponse } from '@/types';

export const httpInstance = new HttpService(baseUrl);

export function login(param: { username: string; password: string }): Promise<AjaxResponse> {
  return httpInstance.post('/user/login', param);
}

export function logout(param: { username: string }): Promise<AjaxResponse> {
  return httpInstance.post('/user/logout', param);
}

export function contentList(param: { pageSize: number; pageNum: number }): Promise<AjaxResponse> {
  return httpInstance.get('/content/list', param);
}

export function contentDetail(param: { id: string }): Promise<AjaxResponse> {
  return httpInstance.get(`/content/${param.id}`, {});
}

export function createContent(param: {
  user: string;
  title: string;
  desc?: string;
  content: string;
}): Promise<AjaxResponse> {
  return httpInstance.post('/content/create', param);
}
