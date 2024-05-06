import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_APP_PORT}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status !== 403 && response.status !== 401) {
      return response;
    }
    if (response.status === 403) {
      alert(
        "This is a protected route. Your account does not have the required privilege to access this route."
      );
    }

    if (response.status === 401) {
      location.replace(
        `${import.meta.env.VITE_BASE_URL}:${
          import.meta.env.VITE_APP_PORT
        }/login`
      );
    }

    return Promise.reject(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
