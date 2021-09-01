import axios from 'utils/axios';
import _ from 'lodash';

const createStaticPage = (payload) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  return axios.post('/static-page', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });
  return axios.post(`/static-page/${id}?_method=PUT`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getStaticPage = (payload) => {
  return axios.get('/page/static-page', { params: payload })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getFeaturedResources = (payload) => {
  return axios.get('/resources/get-feature-resources')
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
  createStaticPage,
  updateStaticPage,
  getFeaturedResources,
  getStaticPage

};
