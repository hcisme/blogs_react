import { AxiosHeaders, AxiosResponse, Method, ResponseType } from 'axios';
import axios from './interceptors';

interface AxiosRequestConfig {
  method: Method;

  /**
   * 除get请求外 都用data传数据
   */
  data: any;
  params: any;
  headers: AxiosHeaders;
  responseType: ResponseType;
}

export default async function (
  url: string,
  { method = 'GET', ...rest }: Partial<AxiosRequestConfig> = {}
): Promise<AxiosResponse & { code: number; message: string | any; success: boolean }> {
  return axios({
    url,
    method,
    ...rest
  });
}
