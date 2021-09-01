import { initialState } from './states';

export const termAndCondition = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TERM_AND_CONDITIONS_SUCCESS': {
      return Object.assign({}, state, {
        termAndConditions: action.data
      });
    }
    case 'GET_TERM_AND_CONDITION_SUCCESS': {
      return Object.assign({}, state, {
        termAndCondition: action.data
      });
    }
    case 'GET_PUBLISH_TERM_CONDITION_SUCCESS': {
      return Object.assign({}, state, {
        publishTermAndConditionPage: action.data
      });
    }
    case 'GET_TERM_CONDITION_BANNER_SUCCESS': {
      return Object.assign({}, state, {
        termConditionBanner: action.data,
        loading: false
      });
    }
    case 'GET_ADMIN_TERM_CONDITION_BANNER_SUCCESS': {
      return Object.assign({}, state, {
        adminTermConditionBanner: action.data,
        loading: false
      });
    }
    default:
      return state;
  }
};
