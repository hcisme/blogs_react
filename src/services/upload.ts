import { request } from '@/utils';

export const uploadImg = async (params: { file: File }) => {
  const { file } = params;
  const payload = new FormData();
  payload.append('file', file);
  const { code, data, message, success } = await request('/api/upload', {
    method: 'post',
    data: payload
  });
  return { imgUrl: data, code, uploadMsg: message, success };
};
