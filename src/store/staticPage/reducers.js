import { initialState } from './states';

export const staticPage = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STATIC_PAGE_SUCCESS': {
      return Object.assign({}, state, {
        staticPage: action.data
      });
    }
    case 'GET_FEATURED_RESOURCES_SUCCESS': {
      return Object.assign({}, state, {
        resources: action.data,
        loading: false
      });
    }
    default:
      return state;
  }
};
