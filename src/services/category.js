import axios from 'utils/axios';

const getCategories = payload => {
  return axios.get('/category',
    {
      params: payload
    })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

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

const updateCategory = (id, payload) => {
  return axios.put(`/category/${id}`, payload)
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
  getCategories,
  createCategory,
  updateCategory
};
