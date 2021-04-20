import { PrivacyPolicy } from 'services/privacyPolicy';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getPrivacyPolicies = () => async dispatch => {
  dispatch(mutation.getPrivacyPoliciesRequest());
  const data = await PrivacyPolicy.getPrivacyPolicies();
  if (data.success) {
    dispatch(mutation.getPrivacyPoliciesSuccess(data.data));
  } else {
    dispatch(mutation.getPrivacyPoliciesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

// Actions
export const createPrivacyPolicy = payload => async (dispatch) => {
  dispatch(mutation.createPrivacyPolicyRequest());
  const data = await PrivacyPolicy.createPrivacyPolicy(payload);
  if (data.success) {
    dispatch(mutation.createPrivacyPolicySuccess());
    dispatch(getPrivacyPolicies());
    dispatch(showSuccessNotification('toast_title.new_privacy_policy', data.message));
    return true;
  } else {
    dispatch(mutation.createPrivacyPolicyFail());
    dispatch(showErrorNotification('toast_title.new_privacy_policy', data.message));
    return false;
  }
};

export const updatePrivacyPolicy = (id, payload) => async (dispatch) => {
  dispatch(mutation.updatePrivacyPolicyRequest());
  const data = await PrivacyPolicy.updatePrivacyPolicy(id, payload);
  if (data.success) {
    dispatch(mutation.updatePrivacyPolicySuccess());
    dispatch(getPrivacyPolicies());
    dispatch(showSuccessNotification('toast_title.edit_privacy_policy', data.message));
    return true;
  } else {
    dispatch(mutation.updatePrivacyPolicyFail());
    dispatch(showErrorNotification('toast_title.edit_privacy_policy', data.message));
    return false;
  }
};

export const publishPrivacyPolicy = id => async (dispatch) => {
  const data = await PrivacyPolicy.publishPrivacyPolicy(id);
  if (data.success) {
    dispatch(getPrivacyPolicies());
    dispatch(showSuccessNotification('toast_title.publish_privacy_policy', data.message));
    return true;
  } else {
    dispatch(mutation.updatePrivacyPolicyFail());
    dispatch(showErrorNotification('toast_title.publish_privacy_policy', data.message));
    return false;
  }
};
