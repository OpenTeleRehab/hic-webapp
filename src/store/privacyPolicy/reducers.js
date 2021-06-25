import { initialState } from './states';

export const privacyPolicy = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRIVACY_POLICIES_SUCCESS': {
      return Object.assign({}, state, {
        privacyPolicies: action.data
      });
    }
    case 'GET_PRIVACY_POLICY_SUCCESS': {
      return Object.assign({}, state, {
        privacyPolicy: action.data
      });
    }
    case 'GET_PUBLISH_PRIVACY_POLICY_SUCCESS': {
      return Object.assign({}, state, {
        publishPrivacyPolicy: action.data
      });
    }
    default:
      return state;
  }
};
