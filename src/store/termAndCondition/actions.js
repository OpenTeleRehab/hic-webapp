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
