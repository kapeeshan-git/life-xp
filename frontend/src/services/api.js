import axios from 'axios';
import { getStoredToken } from '../utils/tokenStorage';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

let activeAuthToken = null;

export const setAuthToken = (token) => {
  activeAuthToken = token || null;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = activeAuthToken || (await getStoredToken());
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const serverMessage =
      error?.response?.data?.message ||
      error?.message ||
      'Unable to communicate with the LifeXP realm server.';
    return Promise.reject(new Error(serverMessage));
  }
);

export const checkApiHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
