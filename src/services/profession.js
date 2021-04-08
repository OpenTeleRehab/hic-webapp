import axios from 'utils/axios';

const getProfession = () => {
  return axios.get('/profession')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createProfession = payload => {
  return axios.post('/profession', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateProfession = (id, payload) => {
  return axios.put(`/profession/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Profession = {
  getProfession,
  createProfession,
  updateProfession
};
