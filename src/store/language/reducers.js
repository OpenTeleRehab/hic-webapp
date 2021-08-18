import { initialState } from './states';

export const language = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LANGUAGES_SUCCESS': {
      return Object.assign({}, state, {
        languages: action.data,
        filters: action.filters
      });
    }
    case 'SET_ACTIVE_LANGUAGE_SUCCESS': {
      return Object.assign({}, state, {
        activeLanguage: action.data
      });
    }
    default:
      return state;
  }
};
