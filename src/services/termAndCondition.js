import axios from 'utils/axios';

const getTermAndConditions = () => {
  return axios.get('/term-condition')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createTermAndCondition = payload => {
  return axios.post('/term-condition', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateTermAndCondition = (id, payload) => {
  return axios.put(`/term-condition/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const TermAndCondition = {
  getTermAndConditions,
  createTermAndCondition,
  updateTermAndCondition
};
