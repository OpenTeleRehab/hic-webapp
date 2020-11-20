import axios from 'utils/axios';

const getProfession = () => {
  return axios.get('/profession')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Profession = {
  getProfession
};
