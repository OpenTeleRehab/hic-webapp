const createUserRequest = () => ({
  type: 'CREATE_USER_REQUEST'
});

const createUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS'
});

const createUserFail = () => ({
  type: 'CREATE_USER_FAIL'
});

export const mutation = {
  createUserRequest,
  createUserSuccess,
  createUserFail
};
