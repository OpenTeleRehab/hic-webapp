import { User } from 'services/user';
import { mutation } from './mutations';

import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

// Actions
export const createUser = payload => async dispatch => {
  dispatch(mutation.createUserRequest());
  const data = await User.createUser(payload);
  if (data.user) {
    dispatch(mutation.createUserSuccess());
    dispatch(showSuccessNotification('New admin account', data.message));
    return true;
  } else {
    dispatch(mutation.createUserFail());
    dispatch(showErrorNotification('New admin account', data.message));
    return false;
  }
};
