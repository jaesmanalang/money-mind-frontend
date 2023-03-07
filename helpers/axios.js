import axios from 'axios';

export const instance = axios.create({
  // baseURL: 'https://money-mind-api-production.up.railway.app/api/v1',
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const axiosPrivate = axios.create({
  // baseURL: 'https://money-mind-api-production.up.railway.app/api/v1',
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export default instance;
