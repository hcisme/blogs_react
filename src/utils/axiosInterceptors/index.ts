import axios, { InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { getLocalStorage, setSessionStorage } from '../localStorage';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('token');
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined
      }
    } as InternalAxiosRequestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (config) => {
    return { ...config, ...config.data, success: true };
  },
  (error) => {
    if (error.response?.status === 401) {
      message.error(error.response.data?.message);
      setSessionStorage('loginstatusMessage', error.response.data?.message);
      window.location.replace('/g');
      return;
    }
    return {
      ...error,
      ...error.response,
      success: false,
      ...error.response.data,
      message: error.response.data?.message || '未知错误，请联系管理员。'
    };
  }
);

export default axios;
