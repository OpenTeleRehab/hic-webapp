const getLanguagesRequest = () => ({
  type: 'GET_LANGUAGES_REQUEST'
});

const getLanguagesSuccess = (data) => ({
  type: 'GET_LANGUAGES_SUCCESS',
  data
});

const getLanguagesFail = () => ({
  type: 'GET_LANGUAGES_FAIL'
});

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
  getLanguagesRequest,
  getLanguagesSuccess,
  getLanguagesFail,
  getDefaultLimitedPatientsRequest,
  getDefaultLimitedPatientsSuccess,
  getDefaultLimitedPatientsFail
};
