import axios from 'utils/axios';

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
  getDefaultLimitedPatient
};
