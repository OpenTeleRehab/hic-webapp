import { Clinic } from 'services/clinic';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getClinics = () => async dispatch => {
  dispatch(mutation.getClinicsRequest());
  const data = await Clinic.getClinics();
  if (data.success) {
    dispatch(mutation.getClinicsSuccess(data.data));
  } else {
    dispatch(mutation.getClinicsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

// Actions
export const createClinic = payload => async (dispatch) => {
  dispatch(mutation.createClinicRequest());
  const data = await Clinic.createClinic(payload);
  if (data.success) {
    dispatch(mutation.createClinicSuccess());
    dispatch(getClinics());
    dispatch(showSuccessNotification('toast_title.new_clinic', data.message));
    return true;
  } else {
    dispatch(mutation.createClinicFail());
    dispatch(showErrorNotification('toast_title.new_clinic', data.message));
    return false;
  }
};
