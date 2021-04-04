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

const getChartDataGlobalAdminRequest = () => ({
  type: 'GET_CHART_DATA_GLOBAL_ADMIN_REQUEST'
});

const getChartDataGlobalAdminSuccess = (data) => ({
  type: 'GET_CHART_DATA_GLOBAL_ADMIN_SUCCESS',
  data
});

const getChartDataGlobalAdminFail = () => ({
  type: 'GET_CHART_DATA_GLOBAL_ADMIN_FAIL'
});

export const mutation = {
  getCountryAdminDataFail,
  getCountryAdminDataRequest,
  getCountryAdminDataSuccess,
  getChartDataGlobalAdminRequest,
  getChartDataGlobalAdminSuccess,
  getChartDataGlobalAdminFail
};
