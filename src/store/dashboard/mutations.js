const getCountryAdminDataRequest = () => ({
  type: 'GET_COUNTRY_ADMIN_DATA_REQUEST'
});

const getCountryAdminDataSuccess = (data) => ({
  type: 'GET_COUNTRY_ADMIN_DATA_SUCCESS',
  data
});

const getCountryAdminDataFail = () => ({
  type: 'GET_COUNTRY_ADMIN_DATA_FAIL'
});

export const mutation = {
  getCountryAdminDataFail,
  getCountryAdminDataRequest,
  getCountryAdminDataSuccess
};
