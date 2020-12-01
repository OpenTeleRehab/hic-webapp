import { Therapist } from 'services/therapist';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';
import { showSpinner } from 'store/spinnerOverlay/actions';

// Actions
export const createTherapist = payload => async (dispatch, getState) => {
  const data = await Therapist.createTherapist(payload);
  if (data.success) {
    dispatch(mutation.createTherapistSuccess());
    const filters = getState().therapist.filters;
    dispatch(getTherapists(filters));
    dispatch(showSuccessNotification('New therapist', data.message));
    return true;
  } else {
    dispatch(mutation.createTherapistFail());
    dispatch(showErrorNotification('New therapist', data.message));
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
    dispatch(showSuccessNotification('toast_title.edit_admin_account', data.message));
    return true;
  } else {
    dispatch(mutation.updateTherapistFail());
    dispatch(showErrorNotification('toast_title.edit_admin_account', data.message));
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
  } else {
    dispatch(mutation.getTherapistsFail());
    dispatch(showSpinner(false));
    if (data.message) {
      dispatch(showErrorNotification('toast_title.error_message', data.message));
    }
  }
};
