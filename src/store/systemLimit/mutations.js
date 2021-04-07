const getSystemLimitsRequest = () => ({
  type: 'GET_SYSTEM_LIMITS_REQUEST'
});

const getSystemLimitsSuccess = (data) => ({
  type: 'GET_SYSTEM_LIMITS_SUCCESS',
  data
});

const getSystemLimitsFail = () => ({
  type: 'GET_SYSTEM_LIMITS_FAIL'
});

const updateSystemLimitRequest = () => ({
  type: 'UPDATE_SYSTEM_LIMIT_REQUEST'
});

const updateSystemLimitSuccess = () => ({
  type: 'UPDATE_SYSTEM_LIMIT_SUCCESS'
});

const updateSystemLimitFail = () => ({
  type: 'UPDATE_SYSTEM_LIMIT_FAIL'
});

export const mutation = {
  getSystemLimitsRequest,
  getSystemLimitsSuccess,
  getSystemLimitsFail,
  updateSystemLimitRequest,
  updateSystemLimitSuccess,
  updateSystemLimitFail
};
