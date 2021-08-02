import axios from 'utils/axios';

const getContributors = () => {
  return axios.get('/contributor')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Contributor = {
  getContributors
};
