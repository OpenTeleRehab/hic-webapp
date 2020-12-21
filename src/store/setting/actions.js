import { Setting } from 'services/setting';
import { mutation } from './mutations';
import {
  showErrorNotification
} from 'store/notification/actions';

export const getDefaultLimitedPatients = () => async dispatch => {
  dispatch(mutation.getDefaultLimitedPatientsRequest());
  const data = await Setting.getDefaultLimitedPatient();
  if (data.success) {
    dispatch(mutation.getDefaultLimitedPatientsSuccess(data.data));
  } else {
    dispatch(mutation.getDefaultLimitedPatientsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
