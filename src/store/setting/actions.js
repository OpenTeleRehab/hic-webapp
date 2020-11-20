import { Setting } from 'services/setting';
import { mutation } from './mutations';
import {
  showErrorNotification
} from 'store/notification/actions';

export const getLanguages = () => async dispatch => {
  dispatch(mutation.getLanguagesRequest());
  const data = await Setting.getLanguage();
  if (data.success) {
    dispatch(mutation.getLanguagesSuccess(data.data));
  } else {
    dispatch(mutation.getLanguagesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

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
