import axios from "axios";
import config from '../../../config.json';

const axiosInstance = axios.create({
  baseURL: config.baseURL
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.error('An unexpected error occurrred.');
    }

    return Promise.reject(error);
  });


export default axiosInstance;