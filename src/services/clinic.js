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

export const Clinic = {
  getClinics
};
