const getProfileRequest = () => ({
  type: 'GET_PROFILE_REQUEST'
});

const getProfileSuccess = (data) => ({
  type: 'GET_PROFILE_SUCCESS',
  data
});

const getProfileFail = () => ({
  type: 'GET_PROFILE_FAIL'
});

const updatePasswordRequest = () => ({
  type: 'UPDATE_PASSWORD_REQUEST'
});

const updatePasswordSuccess = (data) => ({
  type: 'UPDATE_PASSWORD_SUCCESS',
  data
});

const updatePasswordFail = () => ({
  type: 'UPDATE_PASSWORD_FAIL'
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
  getProfileRequest,
  getProfileSuccess,
  getProfileFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  updateUserProfileRequest,
  updateUserProfileSuccess,
  updateUserProfileFail
};
