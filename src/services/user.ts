import { omit } from 'lodash';
import { request } from '@/utils';

interface BasicInfo {
  username: string;
  password: string;
}

export const userRegister = async (
  params: BasicInfo & { nickname: string; headImgUrl: string }
) => {
  return request('/api/users/register', { method: 'post', data: params });
};

export const userLogin = async (params: BasicInfo) => {
  return request('/api/users/login', { method: 'post', data: params });
};

export const getAllUserList = (params: {
  config: {
    pageSize?: number;
    current?: number;
    nickname?: string;
    username?: string;
    role?: string;
  } & { [propValue: string]: string };
}) => {
  return request('/api/users/all', { params: params.config });
};

export const deleteTargetUser = (params: { id: string }) => {
  return request(`/api/users/${params.id}`, {
    method: 'delete'
  });
};

export const updateUserInfo = (params: {
  username: string;
  nickname: string;
  role: string;
  id: string;
}) => {
  return request(`/api/users/${params.id}`, { method: 'patch', data: omit(params, ['id']) });
};
