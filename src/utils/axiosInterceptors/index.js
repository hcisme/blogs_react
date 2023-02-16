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
    console.log(config);
    return { ...config, success: true };
  },
  (error) => {
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
