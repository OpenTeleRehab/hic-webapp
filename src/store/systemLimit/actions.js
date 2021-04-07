import { SystemLimit } from 'services/systemLimit';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getSystemLimits = () => async dispatch => {
  dispatch(mutation.getSystemLimitsRequest());
  const data = await SystemLimit.getSystemLimits();
  if (data.success) {
    dispatch(mutation.getSystemLimitsSuccess(data.data));
  } else {
    dispatch(mutation.getSystemLimitsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const updateSystemLimit = (id, payload) => async (dispatch) => {
  dispatch(mutation.updateSystemLimitRequest());
  const data = await SystemLimit.updateSystemLimit(id, payload);
  if (data.success) {
    dispatch(mutation.updateSystemLimitSuccess());
    dispatch(getSystemLimits());
    dispatch(showSuccessNotification('toast_title.edit_system_limit', data.message));
    return true;
  } else {
    dispatch(mutation.updateSystemLimitFail());
    dispatch(showErrorNotification('toast_title.edit_system_limit', data.message));
    return false;
  }
};
