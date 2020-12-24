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

const updateLocalizationRequest = () => ({
  type: 'UPDATE_LOCALIZATION_REQUEST'
});

const updateLocalizationSuccess = () => ({
  type: 'UPDATE_LOCALIZATION_SUCCESS'
});

const updateLocalizationFail = () => ({
  type: 'UPDATE_LOCALIZATION_FAIL'
});

export const mutation = {
  getLocalizationRequest,
  getLocalizationSuccess,
  getLocalizationFail,
  updateLocalizationRequest,
  updateLocalizationSuccess,
  updateLocalizationFail
};
