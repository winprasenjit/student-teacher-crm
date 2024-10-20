import axios from './axios';

const httpService = {
  get: ({ url, data }) => {
    return axios.get(url, data, {
      credentials: true,
    });
  },
  post: ({ url, data }) => {
    return axios.post(url, data, {
      credentials: "include",
    });
  },
  put: ({ url, data }) => {
    return axios.put(url, data, {
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