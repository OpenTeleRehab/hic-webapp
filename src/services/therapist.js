import axios from 'utils/therapist-axios';

const createTherapist = payload => {
  return axios.post('/therapist', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateTherapist = (id, payload) => {
  return axios.put(`/therapist/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getTherapists = () => {
  return axios.get('/therapist')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Therapist = {
  createTherapist,
  updateTherapist,
  getTherapists
};
