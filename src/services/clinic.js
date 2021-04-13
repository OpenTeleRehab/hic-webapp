import axios from 'utils/axios';

const getClinics = () => {
  return axios.get('/clinic')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createClinic = payload => {
  return axios.post('/clinic', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateClinic = (id, payload) => {
  return axios.put(`/clinic/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const deleteClinic = id => {
  return axios.delete(`/clinic/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Clinic = {
  getClinics,
  createClinic,
  updateClinic,
  deleteClinic
};
