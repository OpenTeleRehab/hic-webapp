import axios from 'utils/axios';

const getSystemLimits = payload => {
  return axios.get('/system-limit', { params: payload })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateSystemLimit = (id, payload) => {
  return axios.put(`/system-limit/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const SystemLimit = {
  getSystemLimits,
  updateSystemLimit
};
