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

const updateIncludedStatus = (id, payload) => {
  return axios.post(`contributor/update-included-status/${id}`, payload)
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
  getContributorStatistics,
  updateIncludedStatus
};
