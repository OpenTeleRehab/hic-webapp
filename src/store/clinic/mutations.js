const getClinicsRequest = () => ({
  type: 'GET_CLINICS_REQUEST'
});

const getClinicsSuccess = (data) => ({
  type: 'GET_CLINICS_SUCCESS',
  data
});

const getClinicsFail = () => ({
  type: 'GET_CLINICS_FAIL'
});

const createClinicRequest = () => ({
  type: 'CREATE_CLINIC_REQUEST'
});

const createClinicSuccess = () => ({
  type: 'CREATE_CLINIC_SUCCESS'
});

const createClinicFail = () => ({
  type: 'CREATE_CLINIC_FAIL'
});

const deleteClinicRequest = () => ({
  type: 'DELETE_CLINIC_REQUEST'
});

const deleteClinicSuccess = () => ({
  type: 'DELETE_CLINIC_SUCCESS'
});

const deleteClinicFail = () => ({
  type: 'DELETE_CLINIC_FAIL'
});

export const mutation = {
  getClinicsFail,
  getClinicsRequest,
  getClinicsSuccess,
  createClinicRequest,
  createClinicSuccess,
  createClinicFail,
  deleteClinicRequest,
  deleteClinicSuccess,
  deleteClinicFail
};
