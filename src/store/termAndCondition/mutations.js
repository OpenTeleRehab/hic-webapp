const getTermAndConditionsRequest = () => ({
  type: 'GET_TERM_AND_CONDITIONS_REQUEST'
});

const getTermAndConditionsSuccess = (data) => ({
  type: 'GET_TERM_AND_CONDITIONS_SUCCESS',
  data
});

const getTermAndConditionsFail = () => ({
  type: 'GET_TERM_AND_CONDITIONS_FAIL'
});

const createTermAndConditionRequest = () => ({
  type: 'CREATE_TERM_AND_CONDITION_REQUEST'
});

const createTermAndConditionSuccess = () => ({
  type: 'CREATE_TERM_AND_CONDITION_SUCCESS'
});

const createTermAndConditionFail = () => ({
  type: 'CREATE_TERM_AND_CONDITION_FAIL'
});

const updateTermAndConditionRequest = () => ({
  type: 'UPDATE_TERM_AND_CONDITION_REQUEST'
});

const updateTermAndConditionSuccess = () => ({
  type: 'UPDATE_TERM_AND_CONDITION_SUCCESS'
});

const updateTermAndConditionFail = () => ({
  type: 'UPDATE_TERM_AND_CONDITION_FAIL'
});

const getTermAndConditionRequest = () => ({
  type: 'GET_TERM_AND_CONDITION_REQUEST'
});

const getTermAndConditionSuccess = (data) => ({
  type: 'GET_TERM_AND_CONDITION_SUCCESS',
  data
});

const getTermAndConditionFail = () => ({
  type: 'GET_TERM_AND_CONDITION_FAIL'
});

const getPublishTermConditionRequest = () => ({
  type: 'GET_PUBLISH_TERM_CONDITION_REQUEST'
});

const getPublishTermConditionSuccess = (data) => ({
  type: 'GET_PUBLISH_TERM_CONDITION_SUCCESS',
  data
});

const getPublishTermConditionFail = () => ({
  type: 'GET_PUBLISH_TERM_CONDITION_FAIL'
});

const createTermConditionBannerRequest = () => ({
  type: 'CREATE_TERM_CONDITION_BANNER_REQUEST'
});

const createTermConditionBannerSuccess = () => ({
  type: 'CREATE_TERM_CONDITION_BANNER_SUCCESS'
});

const createTermConditionBannerFail = () => ({
  type: 'CREATE_TERM_CONDITION_BANNER_FAIL'
});

const getTermConditionBannerRequest = () => ({
  type: 'GET_TERM_CONDITION_BANNER_REQUEST'
});

const getTermConditionBannerSuccess = (data) => ({
  type: 'GET_TERM_CONDITION_BANNER_SUCCESS',
  data
});

const getTermConditionBannerFail = () => ({
  type: 'GET_TERM_CONDITION_BANNER_FAIL'
});

const getAdminTermConditionBannerRequest = () => ({
  type: 'GET_ADMIN_TERM_CONDITION_BANNER_REQUEST'
});

const getAdminTermConditionBannerSuccess = (data) => ({
  type: 'GET_ADMIN_TERM_CONDITION_BANNER_SUCCESS',
  data
});

const getAdminTermConditionBannerFail = () => ({
  type: 'GET_ADMIN_TERM_CONDITION_BANNER_FAIL'
});

export const mutation = {
  getTermAndConditionsRequest,
  getTermAndConditionsSuccess,
  getTermAndConditionsFail,
  getTermAndConditionRequest,
  getTermAndConditionSuccess,
  getTermAndConditionFail,
  createTermAndConditionRequest,
  createTermAndConditionSuccess,
  createTermAndConditionFail,
  updateTermAndConditionRequest,
  updateTermAndConditionSuccess,
  updateTermAndConditionFail,
  getPublishTermConditionRequest,
  getPublishTermConditionSuccess,
  getPublishTermConditionFail,
  createTermConditionBannerRequest,
  createTermConditionBannerFail,
  createTermConditionBannerSuccess,
  getTermConditionBannerSuccess,
  getTermConditionBannerRequest,
  getTermConditionBannerFail,
  getAdminTermConditionBannerRequest,
  getAdminTermConditionBannerSuccess,
  getAdminTermConditionBannerFail
};
