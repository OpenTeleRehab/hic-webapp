import customAxios from 'utils/therapist-axios';
import patientAxios from 'utils/patient-axios';
import axios from 'axios';

window.getUserAxiosCancel = undefined;
const CancelToken = axios.CancelToken;

const createTherapist = payload => {
  return customAxios.post('/therapist', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateTherapist = (id, payload) => {
  return customAxios.put(`/therapist/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateTherapistStatus = (id, payload) => {
  return customAxios.post(`/therapist/updateStatus/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getTherapists = payload => {
  if (window.getUserAxiosCancel !== undefined) {
    window.getUserAxiosCancel();
  }
  return customAxios.get('/therapist', {
    params: payload,
    cancelToken: new CancelToken(function executor (c) {
      window.getUserAxiosCancel = c;
    })
  })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      if (e.response && e.response.data) {
        return e.response.data;
      } else {
        return { success: false };
      }
    });
};

const deleteTherapistUser = (id) => {
  return customAxios.delete(`/therapist/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getPatients = payload => {
  return patientAxios.get('/patient', {
    params: payload
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

const getPatientByTherapistIds = (therapistIds) => {
  const params = { therapist_ids: therapistIds };
  return patientAxios.get('patient/list/by-therapist-ids', { params })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getPatientByTherapistId = (therapistId) => {
  const params = { therapist_id: therapistId };
  return patientAxios.get('patient/list/by-therapist-id', { params })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const resendEmail = (id) => {
  return customAxios.post(`/therapist/resend-email/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Therapist = {
  createTherapist,
  updateTherapist,
  getTherapists,
  deleteTherapistUser,
  getPatients,
  updateTherapistStatus,
  getPatientByTherapistIds,
  getPatientByTherapistId,
  resendEmail
};
