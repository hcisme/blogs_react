import { message } from 'antd';
import axios from 'axios';
import { getLocalStorage, setSessionStorage } from '../localStorage';

// axios.defaults.baseURL = 'http://81.68.248.232:3002';
// "homepage": ".",

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: getLocalStorage('token') ? `Bearer ${getLocalStorage('token')}` : undefined
      }
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (config) => {
    return { ...config, success: true };
  },
  (error) => {
    if (error.response?.status === 401) {
      message.error(error.response.data?.message);
      setSessionStorage({ key: 'loginstatusMessage', value: error.response.data?.message });
      window.location.replace('/g');
    }
    if (error.response?.status !== 200) {
      return {
        ...error,
        ...error.response,
        success: false,
        data: {
          ...error.response.data,
          message: error.response.data?.message || '服务器出错了，请联系管理员。'
        }
      };
    }
    return { ...error, ...error.response, success: false };
  }
);

export default axios;
