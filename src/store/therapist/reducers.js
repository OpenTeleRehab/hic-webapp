import { initialState } from './states';

export const therapist = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THERAPIST_LIST': {
      return Object.assign({}, state, {
        therapistList: action.data
      });
    }
    default:
      return state;
  }
};
