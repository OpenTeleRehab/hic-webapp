import { initialState } from './states';

export const disease = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DISEASES_SUCCESS': {
      return Object.assign({}, state, {
        diseases: action.data,
        filters: action.filters
      });
    }
    case 'GET_DISEASE_SUCCESS': {
      return Object.assign({}, state, {
        disease: action.data
      });
    }
    default:
      return state;
  }
};
