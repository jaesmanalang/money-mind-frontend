import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://money-mind.onrender.com/api/v1',
});

export const axiosPrivate = axios.create({
  baseURL: 'https://money-mind.onrender.comapi/v1',
  withCredentials: true,
});

export default instance;
