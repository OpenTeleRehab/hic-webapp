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
  }
};

export const getChartDataGlobalAdmin = () => async dispatch => {
  dispatch(mutation.getChartDataGlobalAdminRequest());
  const data = await Dashboard.getChartDataGlobalAdmin();
  if (data.success) {
    dispatch(mutation.getChartDataGlobalAdminSuccess(data.data));
  } else {
    dispatch(mutation.getChartDataGlobalAdminFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getChartDataClinicAdmin = clinicId => async dispatch => {
  dispatch(mutation.getChartDataClinicAdminRequest());
  const data = await Dashboard.getChartDataClinicAdmin(clinicId);
  if (data.success) {
    dispatch(mutation.getChartDataClinicAdminSuccess(data.data));
  } else {
    dispatch(mutation.getChartDataClinicAdminFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
