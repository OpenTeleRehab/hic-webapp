import axios from 'utils/axios';

const getContributors = (payload) => {
  return axios.get('/contributor', { params: payload })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const confirmSubmission = (hash) => {
  return axios.get(`/contribute/confirm-submission?hash=${hash}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getContributorStatistics = () => {
  return axios.get('contributor/list/statistics')
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
  getContributors,
  confirmSubmission,
  getContributorStatistics
};
