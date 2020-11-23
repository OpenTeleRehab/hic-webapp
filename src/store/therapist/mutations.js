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

const getTherapistsRequest = () => ({
  type: 'GET_THERAPISTS_REQUEST'
});

const getTherapistsSuccess = (data) => ({
  type: 'GET_THERAPISTS_SUCCESS',
  data
});

const getTherapistsFail = () => ({
  type: 'GET_THERAPISTS_FAIL'
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
  getTherapistsFail
};
