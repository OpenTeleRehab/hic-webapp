import { initialState } from './states';

export const therapist = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_THERAPISTS_SUCCESS': {
      return Object.assign({}, state, {
        therapists: action.data
      });
    }
    default:
      return state;
  }
};
