import axios from '@/utils/axiosInterceptors';

export const uploadImg = async (params) => {
  const { file } = params;
  const payload = new FormData();
  payload.append('file', file);
  const { data: { code, data, message } = {}, success } = await axios.post('/api/upload', payload);
  return { imgUrl: data, code, uploadMsg: message, success };
};
