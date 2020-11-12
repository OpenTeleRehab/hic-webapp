import { Therapist } from 'services/therapist';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

// Actions
export const createTherapist = payload => async dispatch => {
  const data = await Therapist.createTherapist(payload);
  if (data.success) {
    dispatch(mutation.createTherapistSuccess());
    dispatch(getTherapists());
    dispatch(showSuccessNotification('New therapist', data.message));
    return true;
  } else {
    dispatch(mutation.createTherapistFail());
    dispatch(showErrorNotification('New therapist', data.message));
    return false;
  }
};

export const getTherapists = () => async dispatch => {
  dispatch(mutation.getTherapistsRequest());
  const data = await Therapist.getTherapists();
  if (data.success) {
    dispatch(mutation.getTherapistsSuccess(data.data));
  } else {
    dispatch(mutation.getTherapistsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
