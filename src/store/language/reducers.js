import { initialState } from './states';

export const language = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LANGUAGES_SUCCESS': {
      return Object.assign({}, state, {
        languages: action.data,
        filters: action.filters
      });
    }
    default:
      return state;
  }
};
