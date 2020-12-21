import axios from 'utils/axios';

const getLanguage = () => {
  return axios.get('/language')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createLanguage = payload => {
  return axios.post('/language', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Language = {
  getLanguage,
  createLanguage
};
