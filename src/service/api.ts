import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = axios.create(
    {
        baseURL: API_URL,
    }
);

api.interceptors.response.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }

);