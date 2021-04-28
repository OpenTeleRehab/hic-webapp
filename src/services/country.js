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

const deleteCountry = id => {
  return axios.delete(`/country/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getDefinedCountries = () => {
  return axios.get('country/list/defined-country')
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
  updateCountry,
  deleteCountry,
  getDefinedCountries
};
