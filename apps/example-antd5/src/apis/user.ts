import axios from '../utils/axios';

export const getAllUsers = () => {
  return axios.get('/api/users');
};

export const getUser = (id: number) => {
  return axios.get(`/api/users/${id}`);
};

export const addUser = (name: string) => {
  return axios.post(`/api/user`, { name });
};

export const removeUser = (id: number) => {
  return axios.delete(`/api/users/${id}`);
};
