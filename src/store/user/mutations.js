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

const getUsersSuccess = (data) => ({
  type: 'GET_USERS_SUCCESS',
  data
});

const getUsersFail = () => ({
  type: 'GET_USERS_FAIL'
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

const getUserProfileRequest = (data) => ({
  type: 'GET_USERS_REQUEST'
});

const getUserProfileSuccess = (data) => ({
  type: 'CREATE_USER_SUCCESS'
});

const getUserProfileFail = (data) => ({
  type: 'GET_USERS_FAIL'
});

const updateUserProfileFail = () => ({
  type: 'UPDATE_USER_FAIL'
});

const updateUserProfileRequest = () => ({
  type: 'UPDATE_USER_REQUEST'
});

const updateUserProfileSuccess = () => ({
  type: 'UPDATE_USER_SUCCESS'
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
  getUserProfileRequest,
  getUserProfileSuccess,
  getUserProfileFail,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFail

};
