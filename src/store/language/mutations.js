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

const createLanguageRequest = () => ({
  type: 'CREATE_LANGUAGE_REQUEST'
});

const createLanguageSuccess = () => ({
  type: 'CREATE_LANGUAGE_SUCCESS'
});

const createLanguageFail = () => ({
  type: 'CREATE_LANGUAGE_FAIL'
});

export const mutation = {
  getLanguagesRequest,
  getLanguagesSuccess,
  getLanguagesFail,
  createLanguageFail,
  createLanguageRequest,
  createLanguageSuccess
};
