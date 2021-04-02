const createTherapistRequest = () => ({
  type: 'CREATE_THERAPIST_REQUEST'
});

const createTherapistSuccess = () => ({
  type: 'CREATE_THERAPIST_SUCCESS'
});

const createTherapistFail = () => ({
  type: 'CREATE_THERAPIST_FAIL'
});

const updateTherapistRequest = () => ({
  type: 'UPDATE_THERAPIST_REQUEST'
});

const updateTherapistSuccess = () => ({
  type: 'UPDATE_THERAPIST_SUCCESS'
});

const updateTherapistFail = () => ({
  type: 'UPDATE_THERAPIST_FAIL'
});

const updateTherapistStatusRequest = () => ({
  type: 'UPDATE_THERAPIST_STATUS_REQUEST'
});

const updateTherapistStatusSuccess = () => ({
  type: 'UPDATE_THERAPIST_STATUS_SUCCESS'
});

const updateTherapistStatusFail = () => ({
  type: 'UPDATE_THERAPIST_STATUS_FAIL'
});

const getTherapistsRequest = () => ({
  type: 'GET_THERAPISTS_REQUEST'
});

const getTherapistsSuccess = (data, filters) => ({
  type: 'GET_THERAPISTS_SUCCESS',
  data,
  filters
});

const getTherapistsFail = () => ({
  type: 'GET_THERAPISTS_FAIL'
});

const deleteTherapistsRequest = () => ({
  type: 'DELETE_THERAPISTS_REQUEST'
});

const deleteTherapistsSuccess = () => ({
  type: 'DELETE_THERAPISTS_SUCCESS'
});

const deleteTherapistsFail = () => ({
  type: 'DELETE_THERAPISTS_FAIL'
});

const getPatientRequest = () => ({
  type: 'GET_PATIENT_REQUEST'
});

const getPatientSuccess = (data) => ({
  type: 'GET_PATIENT_SUCCESS',
  data
});

const getPatientFail = () => ({
  type: 'GET_PATIENT_FAIL'
});

const getPatientByClinicRequest = () => ({
  type: 'GET_PATIENT_BY_CLINIC_REQUEST'
});

const getPatientByClinicSuccess = (data) => ({
  type: 'GET_PATIENT_BY_CLINIC_SUCCESS',
  data
});

const getPatientByClinicFail = () => ({
  type: 'GET_PATIENT_BY_CLINIC_FAIL'
});

const getTherapistByClinicRequest = () => ({
  type: 'GET_THERAPIST_BY_CLINIC_REQUEST'
});

const getTherapistByClinicSuccess = (data) => ({
  type: 'GET_THERAPIST_BY_CLINIC_SUCCESS',
  data
});

const getTherapistByClinicFail = () => ({
  type: 'GET_THERAPIST_BY_CLINIC_FAIL'
});

export const mutation = {
  createTherapistRequest,
  createTherapistSuccess,
  createTherapistFail,
  updateTherapistRequest,
  updateTherapistSuccess,
  updateTherapistFail,
  getTherapistsRequest,
  getTherapistsSuccess,
  getTherapistsFail,
  deleteTherapistsRequest,
  deleteTherapistsSuccess,
  deleteTherapistsFail,
  getPatientRequest,
  getPatientSuccess,
  getPatientFail,
  updateTherapistStatusRequest,
  updateTherapistStatusSuccess,
  updateTherapistStatusFail,
  getPatientByClinicRequest,
  getPatientByClinicSuccess,
  getPatientByClinicFail,
  getTherapistByClinicRequest,
  getTherapistByClinicSuccess,
  getTherapistByClinicFail
};
