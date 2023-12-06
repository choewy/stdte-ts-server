import axios from 'axios';

import { Cookies } from './cookies.js';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Cookie = Cookies.get();

  return config;
});

api.interceptors.response.use(
  (response) => {
    Cookies.set(response.headers['set-cookie']);

    console.dir(
      {
        url: response.config.url,
        status: response.status,
        response: response.data,
      },
      { depth: null },
    );

    return response;
  },
  (e) => {
    const response = e.response;

    console.dir(
      {
        url: response.config.url,
        status: response.status,
        exception: response.data,
      },
      { depth: null },
    );

    return e;
  },
);

export { api };
