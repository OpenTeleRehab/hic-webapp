import axios from 'utils/axios';

const getCountries = () => {
  return axios.get('/country')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createCountry = payload => {
  return axios.post('/country', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateCountry = (id, payload) => {
  return axios.put(`/country/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Country = {
  getCountries,
  createCountry,
  updateCountry
};
