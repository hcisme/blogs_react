import axios from '@/utils/axiosInterceptors';

export const isStarFn = (params) => {
  return axios.post('/api/star', params);
};
