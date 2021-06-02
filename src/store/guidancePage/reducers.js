import { initialState } from './states';

export const guidancePage = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GUIDANCE_PAGE_SUCCESS': {
      return Object.assign({}, state, {
        guidancePage: action.data
      });
    }
    case 'GET_GUIDANCE_PAGES_SUCCESS': {
      return Object.assign({}, state, {
        guidancePages: action.data,
        filters: action.filters,
        loading: false
      });
    }
    default:
      return state;
  }
};
