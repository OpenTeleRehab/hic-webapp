import { mutation } from './mutations';
import { Dashboard } from 'services/dashboard';
import { showErrorNotification } from 'store/notification/actions';

export const getStatistics = () => async dispatch => {
  dispatch(mutation.getStatisticsRequest());
  const data = await Dashboard.getStatistics();
  if (data.success) {
    dispatch(mutation.getStatisticsSuccess(data.data));
  } else {
    dispatch(mutation.getStatisticsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
