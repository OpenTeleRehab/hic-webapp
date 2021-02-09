import axios from 'utils/axios';

const getQuestionnaires = payload => {
  return axios.get('/questionnaire', { params: payload })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getQuestionnaire = (id, language) => {
  const langParam = language ? `?lang=${language}` : '';
  return axios.get(`/questionnaire/${id}` + langParam)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createQuestionnaire = (payload) => {
  return axios.post('/questionnaire', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateQuestionnaire = (id, payload) => {
  return axios.post(`/questionnaire/${id}?_method=PUT`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const deleteQuestionnaire = id => {
  return axios.delete(`/questionnaire/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Questionnaire = {
  getQuestionnaire,
  getQuestionnaires,
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire
};
