import { Therapist } from 'services/therapist';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

// Actions
export const createTherapist = payload => async dispatch => {
  const data = await Therapist.createTherapist(payload);
  if (data.therapist) {
    dispatch(mutation.createUserSuccess());
    dispatch(showSuccessNotification('New admin account', data.message));
    return true;
  } else {
    dispatch(mutation.createUserFail());
    dispatch(showErrorNotification('New admin account', data.message));
    return false;
  }
};
