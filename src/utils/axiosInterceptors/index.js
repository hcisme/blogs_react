import { message } from 'antd';
import axios from 'axios';
import { getLocalStorage, setSessionStorage } from '../localStorage';

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
    return { ...config, ...config.data, success: true };
  },
  (error) => {
    if (error.response?.status === 401) {
      message.error(error.response.data?.message);
      setSessionStorage({ key: 'loginstatusMessage', value: error.response.data?.message });
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
