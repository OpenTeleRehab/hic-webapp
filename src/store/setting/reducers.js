import { initialState } from './states';

export const defaultLimitedPatient = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DEFAULT_LIMITED_PATIENTS_SUCCESS': {
      return Object.assign({}, state, {
        defaultLimitedPatients: action.data
      });
    }
    default:
      return state;
  }
};
