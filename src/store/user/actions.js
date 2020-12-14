import { User } from 'services/user';
import { Auth } from 'services/auth';
import { mutation } from './mutations';
import keycloak from 'utils/keycloak';
import { getProfile } from 'store/auth/actions';

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
  const data = await User.createUser(payload);
  if (data.success) {
    dispatch(mutation.createUserSuccess());
    const filters = getState().user.filters;
    dispatch(getUsers({ ...filters, admin_type: payload.type }));
    dispatch(showSuccessNotification('toast_title.new_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.createUserFail());
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

export const updateUser = (id, payload) => async (dispatch, getState) => {
  dispatch(mutation.updateUserRequest());
  const data = await User.updateUser(id, payload);
  if (data.success) {
    dispatch(mutation.updateUserSuccess());
    dispatch(getProfile());
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

export const getUserProfile = () => async dispatch => {
  dispatch(mutation.getUserProfileRequest(true));
  if (keycloak.authenticated) {
    const tokenParsed = keycloak.tokenParsed;
    const username = tokenParsed.preferred_username;
    const data = await Auth.getUserProfile(username);
    if (data) {
      dispatch(mutation.getUserProfileSuccess(data.data));
    } else {
      dispatch(mutation.getUserProfileFail());
      dispatch(showErrorNotification('toast_title.error_message', data.message));
    }
  }
};

export const updateUserProfile = (id, payload) => async dispatch => {
  dispatch(mutation.updateUserProfileRequest());
  if (keycloak.authenticated) {
    const data = await User.updateUserProfile(id, payload);
    if (data.success) {
      dispatch(mutation.updateUserProfileSuccess());
      dispatch(getProfile());
      dispatch(showSuccessNotification('toast_title.new_admin_account', data.message));
      return true;
    } else {
      dispatch(mutation.updateUserProfileFail());
      dispatch(showErrorNotification('toast_title.edit_admin_account', data.message));
      return false;
    }
  }
};
