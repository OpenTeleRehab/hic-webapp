import { Localization } from 'services/localization';
import { mutation } from './mutations';
import {
  showErrorNotification
} from 'store/notification/actions';

// export const getLocalizations = () => async dispatch => {
export const getLocalizations = payload => async dispatch => {
  dispatch(mutation.getLocalizationRequest());
  const data = await Localization.getLocalizations(payload);
  if (data.success) {
    dispatch(mutation.getLocalizationSuccess(data.data, payload));
    return data.info;
  } else {
    dispatch(mutation.getLocalizationFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
