import axios from 'utils/axios';
import _ from 'lodash';

const getDiseases = () => {
  return axios.get('/disease')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createDisease = payload => {
  return axios.post('/disease', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateDisease = (id, payload) => {
  return axios.put(`/disease/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const deleteDisease = id => {
  return axios.delete(`/disease/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const uploadDiseases = payload => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  return axios.post('/import/diseases', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Disease = {
  getDiseases,
  createDisease,
  updateDisease,
  deleteDisease,
  uploadDiseases
};
