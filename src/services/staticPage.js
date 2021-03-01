import axios from 'utils/axios';

const getStaticPages = () => {
  return axios.get('/static-page')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createStaticPage = payload => {
  return axios.post('/static-page', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateStaticPage = (id, payload) => {
  return axios.put(`/static-page/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const staticPage = {
  getStaticPages,
  createStaticPage,
  updateStaticPage
};
