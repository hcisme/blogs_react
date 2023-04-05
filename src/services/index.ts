import { request } from '@/utils';

/**
 * 获取最新登录身份信息的接口
 */
export const getLastUserInfo = () => {
  return request('/api/users/getlastuserinfo', { method: 'post' });
};
