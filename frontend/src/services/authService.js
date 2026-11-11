import api from './api';

export const registerUser = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  const response = await api.post('/auth/register', {
    username,
    email,
    password,
    confirmPassword,
  });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
