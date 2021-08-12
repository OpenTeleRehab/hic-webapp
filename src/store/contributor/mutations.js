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

const getConfirmSubmissionRequest = () => ({
  type: 'GET_CONFIRM_SUBMISSION_REQUEST'
});

const getConfirmSubmissionSuccess = () => ({
  type: 'GET_CONFIRM_SUBMISSION_SUCCESS'
});

const getConfirmSubmissionFail = () => ({
  type: 'GET_CONFIRM_SUBMISSION_FAIL'
});

export const mutation = {
  getContributorsRequest,
  getContributorsSuccess,
  getContributorsFail,
  getConfirmSubmissionRequest,
  getConfirmSubmissionSuccess,
  getConfirmSubmissionFail
};
