import { User } from 'services/user';
import { mutation } from './mutations';

import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

import {
  showSpinner
} from 'store/spinnerOverlay/actions';

// Actions
export const createUser = payload => async (dispatch, getState) => {
  dispatch(mutation.createUserRequest());
  dispatch(showSpinner(true));
  const data = await User.createUser(payload);
  if (data.success) {
    dispatch(mutation.createUserSuccess());
    const filters = getState().user.filters;
    dispatch(getUsers({ ...filters, admin_type: payload.type }));
    dispatch(showSuccessNotification('toast_title.new_admin_account', data.message));
    dispatch(showSpinner(false));
    return true;
  } else {
    dispatch(mutation.createUserFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.new_admin_account', data.message));
    return false;
  }
};

export const getUsers = payload => async dispatch => {
  dispatch(mutation.getUsersRequest());
  dispatch(showSpinner(true));
  const data = await User.getUsers(payload);
  if (data.success) {
    dispatch(mutation.getUsersSuccess(data.data, payload));
    dispatch(showSpinner(false));
    return data.info;
  } else {
    dispatch(mutation.getUsersFail());
    dispatch(showSpinner(false));
    if (data.message) {
      dispatch(showErrorNotification('toast_title.error_message', data.message));
    }
  }
};

export const getReviewers = payload => async dispatch => {
  dispatch(mutation.getReviewerRequest());
  dispatch(showSpinner(true));
  const data = await User.getReviewers(payload);
  if (data.success) {
    dispatch(mutation.getReviewerSuccess(data.data, payload));
    dispatch(showSpinner(false));
    return data.info;
  } else {
    dispatch(mutation.getReviewerFail());
    dispatch(showSpinner(false));
    if (data.message) {
      dispatch(showErrorNotification('toast_title.error_message', data.message));
    }
  }
};

export const updateUser = (id, payload) => async (dispatch, getState) => {
  dispatch(mutation.updateUserRequest());
  const data = await User.updateUser(id, payload);
  if (data.success) {
    dispatch(mutation.updateUserSuccess());
    const filters = getState().user.filters;
    dispatch(getUsers({ ...filters, admin_type: payload.type }));
    dispatch(showSuccessNotification('toast_title.edit_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.updateUserFail());
    dispatch(showErrorNotification('toast_title.edit_admin_account', data.message));
    return false;
  }
};

export const updateUserStatus = (id, payload) => async (dispatch, getState) => {
  dispatch(mutation.updateUserRequest());
  const data = await User.updateUserStatus(id, payload);
  if (data.success) {
    dispatch(mutation.updateUserStatusSuccess());
    const filters = getState().user.filters;
    dispatch(getUsers({ ...filters, admin_type: payload.type }));
    dispatch(showSuccessNotification('toast_title.edit_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.updateUserStatusFail());
    dispatch(showErrorNotification('toast_title.edit_admin_account', data.message));
    return false;
  }
};

export const deleteUser = (id, type) => async (dispatch, getState) => {
  dispatch(mutation.deleteUserRequest());
  const data = await User.deleteUser(id);
  if (data.success) {
    dispatch(mutation.deleteUserSuccess());
    const filters = getState().user.filters;
    dispatch(getUsers({ ...filters, admin_type: type }));
    dispatch(showSuccessNotification('toast_title.delete_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.deleteUserFail());
    dispatch(showErrorNotification('toast_title.delete_admin_account', data.message));
    return false;
  }
};

export const resendEmail = (id, type) => async (dispatch, getState) => {
  dispatch(mutation.resendEmailRequest());
  const data = await User.resendEmail(id);
  if (data.success) {
    dispatch(mutation.resendEmailSuccess());
    const filters = getState().user.filters;
    dispatch(getUsers({ ...filters, admin_type: type }));
    dispatch(showSuccessNotification('toast_title.rensend_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.resendEmailFail());
    dispatch(showErrorNotification('toast_title.rensend_admin_account', data.message));
    return false;
  }
};

export const sendResetPassword = (id, type) => async (dispatch, getState) => {
  dispatch(mutation.resendEmailRequest());
  const data = await User.resendEmail(id);
  if (data.success) {
    dispatch(mutation.resendEmailSuccess());
    dispatch(showSuccessNotification('toast_title.rensend_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.resendEmailFail());
    dispatch(showErrorNotification('toast_title.rensend_admin_account', data.message));
    return false;
  }
};
