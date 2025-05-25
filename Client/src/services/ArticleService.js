import axios from 'axios';
import constants from '../config/constants'; 

const API = `${constants.HOST}/api/articles`; 

export const getArticles = async () => axios.get(API);
export const createArticle = async (data) => axios.post(API, data);
export const updateArticle = async (id, data) => axios.put(`${API}/${id}`, data);
export const deleteArticle = async (id) => axios.delete(`${API}/${id}`);