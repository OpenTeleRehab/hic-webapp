import { initialState } from './states';

export const staticPages = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATIC_PAGES_SUCCESS': {
      return Object.assign({}, state, {
        staticPages: action.data
      });
    }
    default:
      return state;
  }
};
