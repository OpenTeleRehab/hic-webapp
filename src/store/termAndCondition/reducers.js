import { initialState } from './states';

export const termAndCondition = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TERM_AND_CONDITIONS_SUCCESS': {
      return Object.assign({}, state, {
        termAndConditions: action.data
      });
    }
    default:
      return state;
  }
};
