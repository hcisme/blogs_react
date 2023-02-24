import axios from '@/utils/axiosInterceptors';

/**
 * 获取最新登录身份信息的接口
 */
export const getLastUserInfo = () => {
  return axios.post('/api/users/getlastuserinfo');
};
