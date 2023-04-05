import { request } from '@/utils';

export interface ArticleProps {
  title: string;
  tag: string;
  content: string;
  coverImg?: string;
}

export const publicArticles = (params: ArticleProps) => {
  return request('/api/articles', {
    method: 'post',
    data: params
  });
};

export const saveArticles = (params: ArticleProps, id: string) => {
  return request(`/api/articles/${id}`, {
    method: 'patch',
    data: params
  });
};

export const getTargetUserArticles = (params: {
  uid: string;
  config: {
    current?: number;
    pageSize?: number;
    title?: string;
    tag?: string;
  } & { [propValue: string]: string };
}) => {
  return request(`/api/articles/users/${params.uid}`, { params: params.config });
};

export const deleteTargetArticle = (params: { aid: string }) => {
  return request(`/api/articles/${params.aid}`, { method: 'delete' });
};

export const getArticleInfoById = (params: { id: string }) => {
  return request(`/api/articles/${params.id}`);
};
