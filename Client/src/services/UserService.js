import axios from 'axios';
import constants from '../config/constants';

const API = `${constants.HOST}/api/users`;

export const getUsers = async () => {
  return axios.get(API);
};

export const createUser = async (data) => {
  return axios.post(API, data);
};

export const updateUser = async (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const deleteUser = async (id) => {
  return axios.delete(`${API}/${id}`);
};

export const loginUser = async (credentials) => {
    return axios.post(`${API}/login`, credentials);
  };