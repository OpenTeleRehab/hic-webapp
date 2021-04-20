import axios from 'utils/axios';

const getPrivacyPolicies = () => {
  return axios.get('/privacy-policy')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createPrivacyPolicy = payload => {
  return axios.post('/privacy-policy', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updatePrivacyPolicy = (id, payload) => {
  return axios.put(`/privacy-policy/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const publishPrivacyPolicy = id => {
  return axios.post(`/privacy-policy/publish/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const PrivacyPolicy = {
  getPrivacyPolicies,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  publishPrivacyPolicy
};
