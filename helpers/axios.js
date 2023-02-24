import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

export default instance;
