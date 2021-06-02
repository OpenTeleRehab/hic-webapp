import { Therapist } from 'services/therapist';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';
import { showSpinner } from 'store/spinnerOverlay/actions';

// Actions
export const createTherapist = payload => async (dispatch, getState) => {
  dispatch(showSpinner(true));
  const data = await Therapist.createTherapist(payload);
  if (data.success) {
    dispatch(mutation.createTherapistSuccess());
    const filters = getState().therapist.filters;
    dispatch(getTherapists(filters));
    dispatch(showSuccessNotification('New therapist', data.message));
    dispatch(showSpinner(false));
    return true;
  } else {
    dispatch(mutation.createTherapistFail());
    dispatch(showErrorNotification('New therapist', data.message));
    dispatch(showSpinner(false));
    return false;
  }
};

export const updateTherapist = (id, payload) => async (dispatch, getState) => {
  dispatch(mutation.updateTherapistRequest());
  const data = await Therapist.updateTherapist(id, payload);
  if (data.success) {
    dispatch(mutation.updateTherapistSuccess());
    const filters = getState().therapist.filters;
    dispatch(getTherapists(filters));
    dispatch(showSuccessNotification('toast_title.edit_therapist_account', data.message));
    return true;
  } else {
    dispatch(mutation.updateTherapistFail());
    dispatch(showErrorNotification('toast_title.edit_therapist_account', data.message));
    return false;
  }
};

export const updateTherapistStatus = (id, payload) => async (dispatch, getState) => {
  dispatch(mutation.updateTherapistStatusRequest());
  const data = await Therapist.updateTherapistStatus(id, payload);
  if (data.success) {
    dispatch(mutation.updateTherapistStatusSuccess());
    const filters = getState().therapist.filters;
    dispatch(getTherapists(filters));
    dispatch(showSuccessNotification('toast_title.edit_therapist_account', data.message));
    return true;
  } else {
    dispatch(mutation.updateTherapistStatusFail());
    dispatch(showErrorNotification('toast_title.edit_therapist_account', data.message));
    return false;
  }
};

export const getTherapists = payload => async dispatch => {
  dispatch(mutation.getTherapistsRequest());
  dispatch(showSpinner(true));
  const data = await Therapist.getTherapists(payload);
  if (data.success) {
    dispatch(mutation.getTherapistsSuccess(data.data, payload));
    dispatch(showSpinner(false));
    return data.info;
  } else {
    dispatch(mutation.getTherapistsFail());
    dispatch(showSpinner(false));
    if (data.message) {
      dispatch(showErrorNotification('toast_title.error_message', data.message));
    }
  }
};

export const deleteTherapistUser = (id, type) => async (dispatch, getState) => {
  dispatch(mutation.deleteTherapistsRequest());
  const data = await Therapist.deleteTherapistUser(id);
  if (data.success) {
    dispatch(mutation.deleteTherapistsSuccess());
    const filters = getState().therapist.filters;
    dispatch(getTherapists(filters));
    dispatch(showSuccessNotification('toast_title.delete_therapist_account', data.message));
    return true;
  } else {
    dispatch(mutation.deleteTherapistsFail());
    dispatch(showErrorNotification('toast_title.delete_therapist_account', data.message));
    return false;
  }
};

export const getPatients = payload => async (dispatch, getState) => {
  dispatch(mutation.getPatientRequest());
  const data = await Therapist.getPatients(payload);
  if (data.success) {
    dispatch(mutation.getPatientSuccess(data.data));
    return data.info;
  } else {
    dispatch(mutation.getPatientFail());
    return false;
  }
};

export const resendEmail = (id) => async (dispatch, getState) => {
  dispatch(mutation.resendEmailRequest());
  const data = await Therapist.resendEmail(id);
  if (data.success) {
    dispatch(mutation.resendEmailSuccess());
    const filters = getState().therapist.filters;
    dispatch(getTherapists(filters));
    dispatch(showSuccessNotification('toast_title.rensend_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.resendEmailFail());
    dispatch(showErrorNotification('toast_title.rensend_admin_account', data.message));
    return false;
  }
};
