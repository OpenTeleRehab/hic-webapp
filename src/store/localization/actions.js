import { Localization } from 'services/localization';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

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

export const updateLocalization = (id, payload) => async (dispatch, getState) => {
  dispatch(mutation.updateLocalizationRequest());
  const data = await Localization.updateLocalization(id, payload);
  if (data.success) {
    dispatch(mutation.updateLocalizationSuccess());
    const filters = getState().localization.filters;
    dispatch(getLocalizations({ ...filters }));
    dispatch(showSuccessNotification('toast_title.edit_localization', data.message));
    return true;
  } else {
    dispatch(mutation.updateLocalizationFail());
    dispatch(showErrorNotification('toast_title.edit_localization', data.message));
    return false;
  }
};
