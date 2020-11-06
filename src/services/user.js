import axios from 'utils/axios';

export const createUser = payload => {
  return axios.post('/admin', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const User = {
  createUser
};
