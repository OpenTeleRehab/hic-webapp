import { initialState } from './states';

export const localization = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LOCALIZATIONS_REQUEST': {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case 'GET_LOCALIZATIONS_SUCCESS': {
      return Object.assign({}, state, {
        localizations: action.data,
        filters: action.filters,
        loading: false
      });
    }
    case 'GET_LOCALIZATIONS_FAIL': {
      return Object.assign({}, state, {
        loading: true
      });
    }
    default:
      return state;
  }
};
