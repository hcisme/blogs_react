import axios from '@/utils/axiosInterceptors';

export const getStarList = (params) => {
  return axios.get(`/api/star/articles/${params.id}`);
};

export const isStarFn = (params) => {
  return axios.post('/api/star', params);
};
