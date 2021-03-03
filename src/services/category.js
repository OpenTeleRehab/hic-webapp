import axios from 'utils/axios';

const createCategory = payload => {
  return axios.post('/category', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Category = {
  createCategory
};
