import axios from 'utils/axios';

export const createTherapist = payload => {
  // todo: update api uri
  payload.type = 'therapist';
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

const getTherapists = () => {
  // todo: update api uri
  return axios.get('/admin', { params: { admin_type: 'therapist' } })
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
  getTherapists
};
