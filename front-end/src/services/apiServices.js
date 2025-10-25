import axios from 'axios';
import { toast } from 'react-toastify';

// ================================
// ✅ API Configuration
// ================================
export const apiUrl = 'http://127.0.0.1:8000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    // 'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  const token = authInfo?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ This is where the token is set
  }
  return config;
});

// ================================
// ✅ Centralized Error Handler (for Axios)
// ================================

const handleApiError = (error) => {
  if (error.response) {
    const response = error.response;
    const errorData = response.data;
    let message = errorData?.message || `HTTP error! Status: ${response.status}`;

    if (errorData?.errors) {
      console.group(`Validation Errors (Status ${response.status})`);
      Object.entries(errorData.errors).forEach(([field, msgs]) => {
        console.error(`${field}: ${msgs.join(', ')}`);
      });
      console.groupEnd();

      const combined = Object.values(errorData.errors).flat().join('\n');
      toast.error(combined || message);
      return Promise.reject(errorData);
    }
  
    toast.error(message);
    return Promise.reject(errorData);
  } 
  
  else if (error.request) {
    const message = "Network Error: No response received from server.";
    console.error("Network Error:", message);
    toast.error(message);
    return Promise.reject({ message });
  } 
  
  else {
    const message = error.message;
    console.error("Axios Setup Error:", message);
    toast.error(message);
    return Promise.reject({ message });
  }
};

// Attach the error interceptor
api.interceptors.response.use(
  (response) => response, 
  handleApiError     
);

// ================================
// ✅ API Methods
// ================================

const extractData = (response) => response.data;

export const post = (url, data) => {
  return api.post(url, data).then(extractData);
};

export const get = (url) => {
  return api.get(url).then(extractData);
};

export const put = (url, data) => {
  return api.put(url, data).then(extractData);
};

export const del = (url) => {
  return api.delete(url).then(extractData);
};

const loginApi = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

loginApi.interceptors.response.use(
    (response) => response,
    handleApiError
);

export const loginPost = (url, data) => {
    return loginApi.post(url, data).then(extractData);
};