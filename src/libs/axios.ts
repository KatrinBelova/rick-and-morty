import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default axiosInstance;
