import axios from 'utils/axios';

const getStatistics = () => {
  return axios.get('dashboard/statistics')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Dashboard = {
  getStatistics
};
