import axios from 'utils/axios';

const getLanguage = () => {
  return axios.get('/getLanguage')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getDefaultLimitedPatient = () => {
  return axios.get('/getDefaultLimitedPatient')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Setting = {
  getLanguage,
  getDefaultLimitedPatient
};
