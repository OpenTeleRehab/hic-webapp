const getLanguagesRequest = () => ({
  type: 'GET_LANGUAGES_REQUEST'
});

const getLanguagesSuccess = (data, filers) => ({
  type: 'GET_LANGUAGES_SUCCESS',
  data,
  filers
});

const getLanguagesFail = () => ({
  type: 'GET_LANGUAGES_FAIL'
});

const createLanguageRequest = () => ({
  type: 'CREATE_LANGUAGE_REQUEST'
});

const createLanguageSuccess = () => ({
  type: 'CREATE_LANGUAGE_SUCCESS'
});

const createLanguageFail = () => ({
  type: 'CREATE_LANGUAGE_FAIL'
});

const updateLanguageRequest = () => ({
  type: 'UPDATE_LANGUAGE_REQUEST'
});

const updateLanguageSuccess = () => ({
  type: 'UPDATE_LANGUAGE_SUCCESS'
});

const updateLanguageFail = () => ({
  type: 'UPDATE_LANGUAGE_FAIL'
});

const deleteLanguageRequest = () => ({
  type: 'DELETE_LANGUAGE_REQUEST'
});

const deleteLanguageSuccess = () => ({
  type: 'DELETE_LANGUAGE_SUCCESS'
});

const deleteLanguageFail = () => ({
  type: 'DELETE_LANGUAGE_FAIL'
});

const setActiveLanguageSuccess = (data) => ({
  type: 'SET_ACTIVE_LANGUAGE_SUCCESS',
  data
});

export const mutation = {
  getLanguagesRequest,
  getLanguagesSuccess,
  getLanguagesFail,
  createLanguageFail,
  createLanguageRequest,
  createLanguageSuccess,
  updateLanguageRequest,
  updateLanguageSuccess,
  updateLanguageFail,
  deleteLanguageRequest,
  deleteLanguageSuccess,
  deleteLanguageFail,
  setActiveLanguageSuccess
};
