import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.app';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ApiJWT = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const Api2JWT = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registerApi = (credentials) => {
  return api.post('/registration', credentials);
};

export const loginApi = (credentials) => {
  return api.post('/login', credentials);
};

export const UserApi = {
  fetchProfile: (token) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.get('/profile');
  },

  fetchBalance: (token) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.get('/balance');
  },

  fetchServices: (token) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.get('/services');
  },

  fetchBanners: (token) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.get('/banner');
  },
  
  fetchTransactionHistory: (token, offset = 0, limit = 5) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.get(`/transaction/history?offset=${offset}&limit=${limit}`);
  },

  topup: (token, credentials) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.post('/topup', credentials);
  },

  payment: (token, credentials) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.post('/transaction', credentials);
  },

  updateProfile: (token, credentials) => {
    const apiJWT = ApiJWT(token);
    return apiJWT.put('/profile/update', credentials);
  },

  uploadImage: (token, credentials) => {
    const apiJWT = Api2JWT(token);
    return apiJWT.put('/profile/image', credentials);
  },
};

export default api;
