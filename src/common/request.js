import axios from 'axios';

const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
const language = 'en-US';

// Create an axios instance
const request = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000 // Request timeout
});

// Request interceptor
request.interceptors.request.use(
  config => {
    config.params = config.params || {};
    config.params.api_key = apiKey;
    config.params.language = language;
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor
request.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    // Global api response error handling here...
    console.log(error);
    return Promise.reject(error);
  }
);

export { request };
