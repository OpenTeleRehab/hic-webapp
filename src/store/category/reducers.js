import { initialState } from './states';

export const category = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CATEGORY_REQUEST': {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case 'CREATE_CATEGORY_SUCCESS':
    case 'CREATE_CATEGORY_FAIL': {
      return Object.assign({}, state, {
        loading: false
      });
    }
    default:
      return state;
  }
};
