const getCountriesRequest = () => ({
  type: 'GET_COUNTRIES_REQUEST'
});

const getCountriesSuccess = (data) => ({
  type: 'GET_COUNTRIES_SUCCESS',
  data
});

const getCountriesFail = () => ({
  type: 'GET_COUNTRIES_FAIL'
});

const getDefinedCountriesRequest = () => ({
  type: 'GET_DEFINED_COUNTRIES_REQUEST'
});

const getDefinedCountriesSuccess = (data) => ({
  type: 'GET_DEFINED_COUNTRIES_SUCCESS',
  data
});

const getDefinedCountriesFail = () => ({
  type: 'GET_DEFINED_COUNTRIES_FAIL'
});

const createCountryRequest = () => ({
  type: 'CREATE_COUNTRY_REQUEST'
});

const createCountrySuccess = () => ({
  type: 'CREATE_COUNTRY_SUCCESS'
});

const createCountryFail = () => ({
  type: 'CREATE_COUNTRY_FAIL'
});

const updateCountryRequest = () => ({
  type: 'UPDATE_COUNTRY_REQUEST'
});

const updateCountrySuccess = () => ({
  type: 'UPDATE_COUNTRY_SUCCESS'
});

const updateCountryFail = () => ({
  type: 'UPDATE_COUNTRY_FAIL'
});

const deleteCountryRequest = () => ({
  type: 'DELETE_COUNTRY_REQUEST'
});

const deleteCountrySuccess = () => ({
  type: 'DELETE_COUNTRY_SUCCESS'
});

const deleteCountryFail = () => ({
  type: 'DELETE_COUNTRY_FAIL'
});

export const mutation = {
  getCountriesFail,
  getCountriesRequest,
  getCountriesSuccess,
  createCountryRequest,
  createCountrySuccess,
  createCountryFail,
  updateCountryRequest,
  updateCountrySuccess,
  updateCountryFail,
  deleteCountryRequest,
  deleteCountrySuccess,
  deleteCountryFail,
  getDefinedCountriesRequest,
  getDefinedCountriesSuccess,
  getDefinedCountriesFail
};
