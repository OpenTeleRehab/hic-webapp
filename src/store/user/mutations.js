const createUserRequest = () => ({
  type: 'CREATE_USER_REQUEST'
});

const createUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS'
});

const createUserFail = () => ({
  type: 'CREATE_USER_FAIL'
});

const getUsersRequest = () => ({
  type: 'GET_USERS_REQUEST'
});

const getUsersSuccess = (data, filters) => ({
  type: 'GET_USERS_SUCCESS',
  data,
  filters
});

const getUsersFail = () => ({
  type: 'GET_USERS_FAIL'
});

const getReviewerRequest = () => ({
  type: 'GET_REVIEWER_REQUEST'
});

const getReviewerSuccess = (data) => ({
  type: 'GET_REVIEWER_SUCCESS',
  data
});

const getReviewerFail = () => ({
  type: 'GET_REVIEWER_FAIL'
});

const updateUserRequest = () => ({
  type: 'UPDATE_USER_REQUEST'
});

const updateUserSuccess = () => ({
  type: 'UPDATE_USER_SUCCESS'
});

const updateUserFail = () => ({
  type: 'UPDATE_USER_FAIL'
});

const updateUserStatusRequest = () => ({
  type: 'UPDATE_USER_STATUS_REQUEST'
});

const updateUserStatusSuccess = () => ({
  type: 'UPDATE_USER_STATUS_SUCCESS'
});

const updateUserStatusFail = () => ({
  type: 'UPDATE_USER_STATUS_FAIL'
});

const deleteUserRequest = () => ({
  type: 'DELETE_USER_REQUEST'
});

const deleteUserSuccess = () => ({
  type: 'DELETE_USER_SUCCESS'
});

const deleteUserFail = () => ({
  type: 'DELETE_USER_FAIL'
});

const resendEmailRequest = () => ({
  type: 'RESEND_EMAIL_REQUEST'
});

const resendEmailSuccess = () => ({
  type: 'RESEND_EMAIL_SUCCESS'
});

const resendEmailFail = () => ({
  type: 'RESEND_EMAIL_FAIL'
});

export const mutation = {
  createUserRequest,
  createUserSuccess,
  createUserFail,
  getUsersRequest,
  getUsersSuccess,
  getUsersFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  updateUserStatusRequest,
  updateUserStatusSuccess,
  updateUserStatusFail,
  resendEmailSuccess,
  resendEmailRequest,
  resendEmailFail,
  getReviewerRequest,
  getReviewerSuccess,
  getReviewerFail
};
