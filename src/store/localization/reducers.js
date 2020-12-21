import { initialState } from './states';

export const localization = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LOCALIZATIONS_SUCCESS': {
      return Object.assign({}, state, {
        localizations: action.data,
        filters: action.filters
      });
    }
    default:
      return state;
  }
};
