import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://money-mind-api-production.up.railway.app/api/v1',
});

export const axiosPrivate = axios.create({
  baseURL: 'https://money-mind-api-production.up.railway.app/api/v1',
  withCredentials: true,
});

export default instance;
