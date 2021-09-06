import { initialState } from './states';

export const contributor = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTRIBUTORS_SUCCESS': {
      return Object.assign({}, state, {
        contributors: action.data
      });
    }
    case 'GET_CONTRIBUTOR_STATISTICS_SUCCESS': {
      return Object.assign({}, state, {
        contributorStatistics: action.data
      });
    }
    default:
      return state;
  }
};
