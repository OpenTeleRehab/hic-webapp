const getLocalizationRequest = () => ({
  type: 'GET_LOCALIZATIONS_REQUEST'
});

const getLocalizationSuccess = (data, filters) => ({
  type: 'GET_LOCALIZATIONS_SUCCESS',
  data,
  filters
});

const getLocalizationFail = () => ({
  type: 'GET_LOCALIZATIONS_FAIL'
});

export const mutation = {
  getLocalizationRequest,
  getLocalizationSuccess,
  getLocalizationFail
};
