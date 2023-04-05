import { request } from '@/utils';

export const getCommentList = (params: { aid: string; current?: number; pageSize?: number }) => {
  const { current, pageSize } = params;
  return request(`/api/comments/articles/${params.aid}`, { params: { current, pageSize } });
};

export const deleteCommentByCid = (params: { cid: string }) => {
  return request(`/api/comments/${params.cid}`, { method: 'delete' });
};
