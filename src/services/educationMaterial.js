import axios from 'utils/axios';
import _ from 'lodash';
import { base64ToFile } from '../utils/file';

const getEducationMaterial = (id, language) => {
  const langParam = language ? `?lang=${language}` : '';
  return axios.get(`/education-material/${id}` + langParam)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getEducationMaterials = payload => {
  return axios.get('/education-material', { params: payload })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createEducationMaterial = (payload) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  return axios.post('/education-material', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const contributeEducationMaterial = (payloads, formFields) => {
  _.map(payloads, (payload) => {
    const formData = new FormData();

    _.forIn(payload, (value, key) => {
      if (value.url) {
        formData.append(key, base64ToFile(value.url, value.fileName, value.fileType), value.fileName, { type: value.fileType });
      } else {
        formData.append(key, value);
      }
    });

    _.forIn(formFields, (value, key) => {
      formData.append(key, value);
    });

    return axios.post('/education-material', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
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

const updateEducationMaterial = (id, payload) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  return axios.post(`/education-material/${id}?_method=PUT`, formData, {
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

const approveEditTranslation = (id, payload) => {
  const formData = new FormData();
  _.forIn(payload, (value, key) => {
    if (value.size) {
      formData.append(key, value.id);
    } else {
      formData.append(key, value);
    }
  });

  return axios.post(`/education-material/approve-translate/${id}`, formData, {
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

const deleteEducationMaterial = id => {
  return axios.delete(`/education-material/${id}`)
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
  return axios.post(`/education-material/cancel-editing/${id}`)
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
  return axios.post(`/education-material/continue-editing/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const rejectEducationMaterial = id => {
  return axios.post(`/education-material/reject/${id}`)
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
  return axios.delete(`/education-material/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getEducationMaterialBySlug = (payload, language) => {
  const langParam = language ? `?lang=${language}` : '';
  return axios.get('/education-material/list/by-slug' + langParam, { params: payload })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const EducationMaterial = {
  getEducationMaterial,
  createEducationMaterial,
  contributeEducationMaterial,
  updateEducationMaterial,
  getEducationMaterials,
  deleteEducationMaterial,
  continueEditing,
  cancelEditing,
  rejectEducationMaterial,
  rejectEditTranslation,
  approveEditTranslation,
  getEducationMaterialBySlug
};
