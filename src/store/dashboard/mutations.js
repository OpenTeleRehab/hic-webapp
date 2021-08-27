const getStatisticsRequest = () => ({
  type: 'GET_STATISTICS_REQUEST'
});

const getStatisticsSuccess = (data) => ({
  type: 'GET_STATISTICS_SUCCESS',
  data
});

const getStatisticsFail = () => ({
  type: 'GET_STATISTICS_FAIL'
});

export const mutation = {
  getStatisticsRequest,
  getStatisticsSuccess,
  getStatisticsFail
};
