import { Dashboard } from 'services/dashboard';
import { mutation } from './mutations';
import {
  showErrorNotification
} from 'store/notification/actions';

export const getCountryAdminData = countryId => async dispatch => {
  dispatch(mutation.getCountryAdminDataRequest());
  const data = await Dashboard.getDataForCountryAdmin(countryId);
  if (data.success) {
    dispatch(mutation.getCountryAdminDataSuccess(data.data));
  } else {
    dispatch(mutation.getCountryAdminDataFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
