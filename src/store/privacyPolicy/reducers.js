import { initialState } from './states';

export const privacyPolicy = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRIVACY_POLICIES_SUCCESS': {
      return Object.assign({}, state, {
        privacyPolicies: action.data
      });
    }
    default:
      return state;
  }
};
