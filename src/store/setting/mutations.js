const getDefaultLimitedPatientsRequest = () => ({
  type: 'GET_DEFAULT_LIMITED_PATIENTS_REQUEST'
});

const getDefaultLimitedPatientsSuccess = (data) => ({
  type: 'GET_DEFAULT_LIMITED_PATIENTS_SUCCESS',
  data
});

const getDefaultLimitedPatientsFail = () => ({
  type: 'GET_DEFAULT_LIMITED_PATIENTS_FAIL'
});

export const mutation = {
  getDefaultLimitedPatientsRequest,
  getDefaultLimitedPatientsSuccess,
  getDefaultLimitedPatientsFail
};
