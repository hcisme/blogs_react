import { message } from 'antd';
import axios from 'axios';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response?.status === 500) {
      message.warning('服务器出错了，请联系管理员。');
    }
    return { ...error, ...error.response };
  }
);

export default axios;
