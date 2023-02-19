import { omit } from 'lodash';
import axios from '../utils/axiosInterceptors';

export const userRegister = async (params) => {
  return axios.post('/api/users/register', params);
};

export const userLogin = async (params) => {
  return axios.post('/api/users/login', params);
};

export const getAllUserList = (params) => {
  return axios.get('/api/users/all', params);
};

export const deleteTargetUser = (params) => {
  return axios.delete(`/api/users/${params.id}`);
};

export const updateUserInfo = (params) => {
  return axios.patch(`/api/users/${params.id}`, { ...omit(params, ['id']) });
};
