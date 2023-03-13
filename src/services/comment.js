import { axios } from '@/utils';

export const getCommentList = (params) => {
  const { current, pageSize } = params;
  return axios.get(`/api/comments/articles/${params.aid}`, { params: { current, pageSize } });
};

export const deleteCommentByCid = (params) => {
  return axios.delete(`/api/comments/${params.cid}`);
};
