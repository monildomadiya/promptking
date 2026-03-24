import axios from 'axios';

// Update this if the backend URL changes
const SERVER_URL = 'https://promptking-q4qu.onrender.com';

const api = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true
});

api.interceptors.request.use(config => {
  const adminPin = localStorage.getItem('adminPin');
  if (adminPin) {
    config.headers['X-Admin-Pin'] = adminPin;
  }
  return config;
});

// Recursively prepend the SERVER_URL to any relative /uploads/ paths
const transformUploadPaths = (data) => {
  if (!data) return data;
  if (typeof data === 'string' && data.startsWith('/uploads/')) {
    return `${SERVER_URL}${data}`;
  }
  if (Array.isArray(data)) {
    return data.map(item => transformUploadPaths(item));
  }
  if (typeof data === 'object' && data !== null) {
    const newData = {};
    for (const key in data) {
      newData[key] = transformUploadPaths(data[key]);
    }
    return newData;
  }
  return data;
};

// Intercept responses to map images automatically
api.interceptors.response.use(
  (response) => {
    response.data = transformUploadPaths(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
