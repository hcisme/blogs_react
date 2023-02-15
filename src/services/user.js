import axios from '../utils/axiosInterceptors';

export const userRegister = async (params) => {
  return axios.post('/api/users/register', params);
};

export const userLogin = async (params) => {
  return axios.post('/api/users/login', params);
};
