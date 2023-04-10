import { request } from '@/utils';

export const getStarList = (params: { id: string }) => {
  return request(`/api/star/articles/${params.id}`);
};

export const isStarFn = (params: { aid: string; starId: string; isStar: number }) => {
  return request('/api/star', {
    method: 'post',
    data: params
  });
};
