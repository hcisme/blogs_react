import axios from '@/utils/axiosInterceptors';

export const uploadImg = async (params) => {
  const { file } = params;
  const payload = new FormData();
  payload.append('file', file);
  return axios.post('/api/upload', payload);
};
