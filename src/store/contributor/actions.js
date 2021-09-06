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

export const confirmSubmission = (hash) => async dispatch => {
  dispatch(mutation.getConfirmSubmissionRequest());
  dispatch(showSpinner(true));
  const data = await Contributor.confirmSubmission(hash);
  if (data.success) {
    dispatch(mutation.getConfirmSubmissionSuccess());
    dispatch(showSpinner(false));
    return data.message;
  } else {
    dispatch(mutation.getConfirmSubmissionFail());
    dispatch(showSpinner(false));
    return data.message;
  }
};

export const getContributorStatistics = () => async dispatch => {
  dispatch(mutation.getContributorStatisticsRequest());
  dispatch(showSpinner(true));
  const data = await Contributor.getContributorStatistics();
  if (data.success) {
    dispatch(mutation.getContributorStatisticsSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getContributorStatisticsFail());
    dispatch(showSpinner(false));
    if (data.message) {
      dispatch(showErrorNotification('toast_title.error_message', data.message));
    }
  }
};
