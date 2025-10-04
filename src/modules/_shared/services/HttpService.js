import axios from './axios';

const httpService = {
  get: ({ url, data }) => {
    return axios.get(url, data, {
      credentials: true,
    });
  },
  post: ({ url, data, ...options }) => {
    return axios.post(url, data, {
      ...options,
      credentials: "include",
    });
  },
  put: ({ url, data, ...options }) => {
    return axios.put(url, data, {
      ...options,
      credentials: "include",
    });
  },
  delete: ({ url, data }) => {
    return axios.delete(url, data, {
      credentials: "include",
    });
  },
};

export default httpService; 