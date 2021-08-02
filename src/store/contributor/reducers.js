import { initialState } from './states';

export const contributor = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTRIBUTORS_SUCCESS': {
      return Object.assign({}, state, {
        contributors: action.data
      });
    }
    default:
      return state;
  }
};
