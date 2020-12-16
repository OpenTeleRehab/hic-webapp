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

const createCountryRequest = () => ({
  type: 'CREATE_COUNTRY_REQUEST'
});

const createCountrySuccess = () => ({
  type: 'CREATE_COUNTRY_SUCCESS'
});

const createCountryFail = () => ({
  type: 'CREATE_COUNTRY_FAIL'
});

export const mutation = {
  getCountriesFail,
  getCountriesRequest,
  getCountriesSuccess,
  createCountryRequest,
  createCountrySuccess,
  createCountryFail
};
