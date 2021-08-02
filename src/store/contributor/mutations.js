const getContributorsRequest = () => ({
  type: 'GET_CONTRIBUTORS_REQUEST'
});

const getContributorsSuccess = (data) => ({
  type: 'GET_CONTRIBUTORS_SUCCESS',
  data
});

const getContributorsFail = () => ({
  type: 'GET_CONTRIBUTORS_FAIL'
});

export const mutation = {
  getContributorsRequest,
  getContributorsSuccess,
  getContributorsFail
};
