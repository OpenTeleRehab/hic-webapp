import { Contributor } from 'services/contributor';
import { mutation } from './mutations';

import {
  showErrorNotification
} from 'store/notification/actions';

import {
  showSpinner
} from 'store/spinnerOverlay/actions';

export const getContributors = payload => async dispatch => {
  dispatch(mutation.getContributorsRequest());
  dispatch(showSpinner(true));
  const data = await Contributor.getContributors(payload);
  if (data.success) {
    dispatch(mutation.getContributorsSuccess(data.data, payload));
    dispatch(showSpinner(false));
    return data.info;
  } else {
    dispatch(mutation.getContributorsFail());
    dispatch(showSpinner(false));
    if (data.message) {
      dispatch(showErrorNotification('toast_title.error_message', data.message));
    }
  }
};