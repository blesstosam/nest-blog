import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';
// import store from '../store';
// import { LOGOUT } from '@/store/mutation-types';
import Vue from 'vue';
// import storage from '@/assets/script/storage';

let dispathLogoutTime = 0; // 确保logout只调用了一次

export class HttpService {
  service: AxiosInstance;

  constructor(url: string) {
    this.service = axios.create({
      baseURL: url,
      timeout: 30000
    });

    // request拦截器
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // if (token) {
        //   config.headers.token = token;
        // }

        return config;
      },
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );

    // respone拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.status !== 200 && response.status !== 201) {
          // 405: 其他客户端登录了;  407:Token 过期了;
          if (response.status !== 407 && response.status !== 405) {
            Vue.prototype.$Message.error('网络异常，请稍后重试');
          } else if (dispathLogoutTime === 0) {
            dispathLogoutTime++;
            // storage.set('logoutMsg', response.data.msg);
            // store.dispatch(LOGOUT);
          }
          return Promise.reject(response);
        }
        // 405: 其他客户端登录了;  407:Token 过期了;
        if (response.data.code === 407 || response.data.code === 405) {
          if (dispathLogoutTime === 0) {
            dispathLogoutTime++;
            // storage.set('logoutMsg', response.data.msg);
            // store.dispatch(LOGOUT);
          }
          return Promise.reject(response); // 407的直接不处理
        }
        return response; // return 会默认resolve
      },
      (error: AxiosError) => {
        // 404，500, timeout 等服务器报错
        const errStr = error + '';
        if (errStr.search('timeout') === -1) {
          // 处理timeout
          return Promise.reject(error);
        }
        /* eslint-disable-next-line */
        return Promise.reject({ msg: '网络异常，请稍后重试' });
      }
    );
  }

  post(url: string, param?: Object): Promise<any> {
    const _header = { 'Content-Type': 'application/json' }; // 改用json形式上传参数
    param = param || {};

    return new Promise((resolve) => {
      this.service.post(url, param, { headers: _header }).then(
        (res: AxiosResponse) => {
          resolve(res.data);
        },
        (err: AxiosError) => {
          resolve(err);
        }
      );
    });
  }

  get(url: string, param: Object): Promise<any> {
    return new Promise((resolve) => {
      this.service.get(url, { params: param || {} }).then(
        (res: AxiosResponse) => {
          // res为resolve
          resolve(res.data);
        },
        (err: AxiosError) => {
          // err为reject
          resolve(err);
        }
      );
    });
  }

  /**
   * ajax上传流对象
   * @param {*} url
   * @param {formData对象} data
   */
  upload(url: string, data: any): Promise<any> {
    /* eslint-disable-next-line */
    return new Promise((reslove) => {
      this.service
        .post(url, data, {
          headers: { 'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime() }
        })
        .then(
          (res: any) => {
            reslove(res.data);
          },
          (err: any) => {
            reslove(err);
          }
        );
    });
  }
}

// 获取本地json数据
export function getJson(url: string): Promise<any> {
  return new Promise((resolve) => {
    axios.get(url).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        resolve(err);
      }
    );
  });
}
