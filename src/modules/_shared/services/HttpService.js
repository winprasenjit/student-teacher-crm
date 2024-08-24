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
  put: axios.put,
  delete: axios.delete,
};

export default httpService; 