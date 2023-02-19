import axios from '../utils/axiosInterceptors';

export const publicArticles = (params) => {
  return axios.post('/api/articles', params);
};

export const getTargetUserArticles = (params) => {
  return axios.get(`/api/articles/users/${params.uid}`, params);
};

export const deleteTargetArticle = (params) => {
  return axios.delete(`/api/articles/${params.aid}`);
};

export const getArticleInfoById = (params) => {
  return axios.get(`/api/articles/${params.id}`);
};

export const saveArticles = (params, id) => {
  return axios.patch(`/api/articles/${id}`, params);
};
