import { axios } from '@/utils';

export interface ArticleProps {
  title: string;
  tag: string;
  content: string;
  coverImg?: string;
}

export const publicArticles = (params: ArticleProps) => {
  return axios.post('/api/articles', params);
};

export const saveArticles = (params: ArticleProps, id: string) => {
  return axios.patch(`/api/articles/${id}`, params);
};

export const getTargetUserArticles = (params: {
  uid: string;
  params: {
    current?: number;
    pageSize?: number;
    title?: string;
    tag?: string;
    [propName: string]: string;
  };
}) => {
  return axios.get(`/api/articles/users/${params.uid}`, params);
};

export const deleteTargetArticle = (params: { aid: string }) => {
  return axios.delete(`/api/articles/${params.aid}`);
};

export const getArticleInfoById = (params: { id: string }) => {
  return axios.get(`/api/articles/${params.id}`);
};
