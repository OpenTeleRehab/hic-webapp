import { initialState } from './states';

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATISTICS_SUCCESS': {
      return Object.assign({}, state, {
        statistics: action.data
      });
    }
    default:
      return state;
  }
};
