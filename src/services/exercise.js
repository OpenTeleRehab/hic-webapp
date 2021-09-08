import axios from 'utils/axios';
import _ from 'lodash';
import { base64ToFile } from '../utils/file';

const getExercises = payload => {
  return axios.get('/exercise', { params: payload })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getExercise = (id, language) => {
  const langParam = language ? `?lang=${language}` : '';
  return axios.get(`/exercise/${id}` + langParam)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getExerciseInEnglish = (id) => {
  return axios.get(`/exercise/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createExercise = (payload, mediaUploads) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  _.forIn(mediaUploads, (value, key) => {
    if (value.file) {
      formData.append(key, value.file);
    }
  });

  return axios.post('/exercise', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const contributeExercise = (payloads, formFields) => {
  _.map(payloads, (payload) => {
    const formData = new FormData();

    _.forIn(payload, (value, key) => {
      formData.append(key, value);
    });

    _.forIn(payload.media_uploads, (value, key) => {
      if (value.url && value.id === undefined) {
        formData.append(key, base64ToFile(value.url, value.fileName, value.fileType), value.fileName, { type: value.fileType });
      }
    });

    _.forIn(formFields, (value, key) => {
      formData.append(key, value);
    });

    return axios.post('/exercise', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

const updateExercise = (id, payload, mediaUploads) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  _.forIn(mediaUploads, (value, key) => {
    if (value.file) {
      formData.append(key, value.file);
    } else {
      formData.append('media_files[]', value.id);
    }
  });

  return axios.post(`/exercise/${id}?_method=PUT`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const approveEditTranslation = (id, payload, mediaUploads) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  _.forIn(mediaUploads, (value, key) => {
    if (value.file) {
      formData.append(key, value.file);
    } else {
      formData.append('media_files[]', value.id);
    }
  });

  return axios.post(`/exercise/approve-translate/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(
    res => {
      return res.data;
    }
  ).catch((e) => {
    return e.response.data;
  });
};

const rejectExercise = id => {
  return axios.post(`/exercise/reject/${id}`)
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
  return axios.delete(`/exercise/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const deleteExercise = id => {
  return axios.delete(`/exercise/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const downloadExercises = payload => {
  return axios.get('/exercise/export/csv', { params: payload, responseType: 'blob' })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const uploadExercises = payload => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  return axios.post('/import/exercises', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Exercise = {
  getExercises,
  getExercise,
  getExerciseInEnglish,
  createExercise,
  contributeExercise,
  updateExercise,
  approveEditTranslation,
  rejectExercise,
  rejectEditTranslation,
  deleteExercise,
  downloadExercises,
  uploadExercises
};
