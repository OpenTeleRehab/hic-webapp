// import { User } from '../../services/user';
import { mutation } from './mutations';

const handleError = err => {
  console.error('Error in Login action : ', err);
};

// Actions
export const userLoginRequest = payload => async dispatch => {
  try {
    // const result = await dispatch(User.userLogin(payload));
    const result = { userName: 'foo' };
    dispatch(mutation.setUserLoginDetail(result));
  } catch (err) {
    handleError(err);
  }
};
