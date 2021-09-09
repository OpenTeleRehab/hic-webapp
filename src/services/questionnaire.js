import axios from 'utils/axios';
import _ from 'lodash';
import { base64ToFile } from '../utils/file';

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

const cancelEditing = id => {
  return axios.post(`/questionnaire/cancel-editing/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const continueEditing = id => {
  return axios.post(`/questionnaire/continue-editing/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const rejectQuestionnaire = id => {
  return axios.post(`/questionnaire/reject/${id}`)
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
  const formData = new FormData();
  formData.append('lang', payload.lang);
  formData.append('data', JSON.stringify(payload));
  _.map(payload.questions, (question, index) => {
    if (question.file) {
      formData.append(index, question.file);
    }
  });

  return axios.post('/questionnaire', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const contributeQuestionnaire = (payloads, formFields) => {
  _.map(payloads, (payload) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));
    formData.append('id', payload.id);
    formData.append('lang', payload.lang);
    formData.append('edit_translation', payload.edit_translation);

    _.forIn(formFields, (value, key) => {
      formData.append(key, value);
    });

    _.map(payload.questions, (question, index) => {
      if (question.file && question.file.url && question.file.id === undefined) {
        formData.append(index, base64ToFile(question.file.url, question.file.fileName, question.file.fileType), question.file.fileName, { type: question.file.fileType });
      }
    });

    return axios.post('/questionnaire', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(
        res => {
          return res.data;
        }
      )
      .catch((e) => {
        return e.response.data;
      });
  });

  return true;
};

const updateQuestionnaire = (id, payload) => {
  const formData = new FormData();
  formData.append('lang', payload.lang);
  formData.append('data', JSON.stringify(payload));
  _.map(payload.questions, (question, index) => {
    if (question.file) {
      if (question.file.size) {
        formData.append(index, question.file);
      } else {
        formData.append('no_changed_files[]', question.id);
      }
    }
  });

  return axios.post(`/questionnaire/${id}?_method=PUT`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const approveEditTranslation = (id, payload) => {
  const formData = new FormData();
  formData.append('lang', payload.lang);
  formData.append('data', JSON.stringify(payload));
  _.map(payload.questions, (question, index) => {
    if (question.file) {
      if (question.file.size) {
        formData.append(index, question.file);
      } else {
        formData.append('no_changed_files[]', question.id);
      }
    }
  });

  return axios.post(`/questionnaire/approve-translate/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

const rejectEditTranslation = id => {
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
  contributeQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
  continueEditing,
  cancelEditing,
  rejectQuestionnaire,
  rejectEditTranslation,
  approveEditTranslation
};
