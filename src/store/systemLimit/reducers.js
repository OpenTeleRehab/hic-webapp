import { initialState } from './states';

export const systemLimit = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SYSTEM_LIMITS_SUCCESS': {
      return Object.assign({}, state, {
        systemLimits: action.data
      });
    }
    default:
      return state;
  }
};
