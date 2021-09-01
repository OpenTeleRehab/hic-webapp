import axios from 'utils/axios';
import _ from 'lodash';

const getTermAndConditions = () => {
  return axios.get('/term-condition')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getTermAndCondition = (id, language) => {
  const langParam = language ? `?lang=${language}` : '';
  return axios.get(`/term-condition/${id}` + langParam)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createTermAndCondition = payload => {
  return axios.post('/term-condition', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateTermAndCondition = (id, payload) => {
  return axios.put(`/term-condition/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const publishTermAndCondition = id => {
  return axios.post(`/term-condition/publish/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getPublishTermConditionPage = lang => {
  const langParam = lang ? `?lang=${lang}` : '';
  return axios.get('/user-term-condition' + langParam)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createTermConditionBanner = (payload) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  return axios.post('/term-condition-banner', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getAdminTermConditionBanner = () => {
  return axios.get('/term-condition-banner')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getTermConditionBanner = () => {
  return axios.get('/termConditionBanner')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const TermAndCondition = {
  getTermAndConditions,
  getTermAndCondition,
  createTermAndCondition,
  updateTermAndCondition,
  publishTermAndCondition,
  getPublishTermConditionPage,
  createTermConditionBanner,
  getTermConditionBanner,
  getAdminTermConditionBanner
};
