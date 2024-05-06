import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_APP_PORT}`, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.status !== 403) {
      return response;
    }
    
    alert("This is a protected route. Your account does not have the required privilege to access this route.");
    return Promise.reject(response);
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
