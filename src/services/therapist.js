import axios from 'utils/axios';

export const createTherapist = payload => {
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

const getTherapists = () => {
  // todo: update api uri
  return axios.get('/admin', { params: { admin_type: 'global_admin' } })
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
