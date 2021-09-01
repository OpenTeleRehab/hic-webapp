import { TermAndCondition } from 'services/termAndCondition';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';
import {
  showSpinner
} from 'store/spinnerOverlay/actions';

export const getTermAndConditions = () => async dispatch => {
  dispatch(mutation.getTermAndConditionsRequest());
  const data = await TermAndCondition.getTermAndConditions();
  if (data.success) {
    dispatch(mutation.getTermAndConditionsSuccess(data.data));
  } else {
    dispatch(mutation.getTermAndConditionsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getTermAndCondition = (id, language) => async (dispatch) => {
  dispatch(mutation.getTermAndConditionRequest());
  const res = await TermAndCondition.getTermAndCondition(id, language);
  if (res) {
    dispatch(mutation.getTermAndConditionSuccess(res.data));
  } else {
    dispatch(mutation.getTermAndConditionFail());
    dispatch(showErrorNotification('toast_title.error_message', res.message));
  }
};

// Actions
export const createTermAndCondition = payload => async (dispatch) => {
  dispatch(mutation.createTermAndConditionRequest());
  dispatch(showSpinner(true));
  const data = await TermAndCondition.createTermAndCondition(payload);
  if (data.success) {
    dispatch(mutation.createTermAndConditionSuccess());
    dispatch(getTermAndConditions());
    dispatch(showSuccessNotification('toast_title.new_term_and_condition', data.message));
    dispatch(showSpinner(false));
    return true;
  } else {
    dispatch(mutation.createTermAndConditionFail());
    dispatch(showErrorNotification('toast_title.new_term_and_condition', data.message));
    dispatch(showSpinner(false));
    return false;
  }
};

export const updateTermAndCondition = (id, payload) => async (dispatch) => {
  dispatch(mutation.updateTermAndConditionRequest());
  const data = await TermAndCondition.updateTermAndCondition(id, payload);
  if (data.success) {
    dispatch(mutation.updateTermAndConditionSuccess());
    dispatch(getTermAndConditions());
    dispatch(showSuccessNotification('toast_title.edit_term_and_condition', data.message));
    return true;
  } else {
    dispatch(mutation.updateTermAndConditionFail());
    dispatch(showErrorNotification('toast_title.edit_term_and_condition', data.message));
    return false;
  }
};

export const publishTermAndCondition = id => async (dispatch) => {
  // dispatch(mutation.updateTermAndConditionRequest());
  const data = await TermAndCondition.publishTermAndCondition(id);
  if (data.success) {
    // dispatch(mutation.updateTermAndConditionSuccess());
    dispatch(getTermAndConditions());
    dispatch(showSuccessNotification('toast_title.publish_term_and_condition', data.message));
    return true;
  } else {
    dispatch(mutation.updateTermAndConditionFail());
    dispatch(showErrorNotification('toast_title.publish_term_and_condition', data.message));
    return false;
  }
};

export const getPublishTermCondition = (lang) => async dispatch => {
  dispatch(mutation.getPublishTermConditionRequest());
  dispatch(showSpinner(true));
  const data = await TermAndCondition.getPublishTermConditionPage(lang);
  if (data) {
    dispatch(mutation.getPublishTermConditionSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getPublishTermConditionFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const createTermConditionBanner = (payload) => async (dispatch) => {
  dispatch(mutation.createTermConditionBannerRequest());
  const data = await TermAndCondition.createTermConditionBanner(payload);
  if (data.success) {
    dispatch(mutation.createTermConditionBannerSuccess());
    dispatch(getAdminTermConditionBanner());
    dispatch(showSuccessNotification('toast_title.add_term_and_condition_banner', data.message));
    return true;
  } else {
    dispatch(mutation.createTermConditionBannerFail());
    dispatch(showErrorNotification('toast_title.add_term_and_condition_banner', data.message));
    return false;
  }
};

export const getAdminTermConditionBanner = () => async dispatch => {
  dispatch(mutation.getAdminTermConditionBannerRequest());
  dispatch(showSpinner(true));
  const data = await TermAndCondition.getAdminTermConditionBanner();
  if (data.success) {
    dispatch(mutation.getAdminTermConditionBannerSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getAdminTermConditionBannerFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getTermConditionBanner = () => async dispatch => {
  dispatch(mutation.getTermConditionBannerRequest());
  dispatch(showSpinner(true));
  const data = await TermAndCondition.getTermConditionBanner();
  if (data.success) {
    dispatch(mutation.getTermConditionBannerSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getTermConditionBannerFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
