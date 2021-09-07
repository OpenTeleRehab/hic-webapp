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

const getContributorStatisticsRequest = () => ({
  type: 'GET_CONTRIBUTOR_STATISTICS_REQUEST'
});

const getContributorStatisticsSuccess = (data) => ({
  type: 'GET_CONTRIBUTOR_STATISTICS_SUCCESS',
  data
});

const getContributorStatisticsFail = () => ({
  type: 'GET_CONTRIBUTOR_STATISTICS_FAIL'
});

export const mutation = {
  getContributorsRequest,
  getContributorsSuccess,
  getContributorsFail,
  getConfirmSubmissionRequest,
  getConfirmSubmissionSuccess,
  getConfirmSubmissionFail,
  getContributorStatisticsFail,
  getContributorStatisticsRequest,
  getContributorStatisticsSuccess
};
