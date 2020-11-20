import { initialState } from './states';

export const language = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LANGUAGES_SUCCESS': {
      return Object.assign({}, state, {
        languages: action.data
      });
    }
    default:
      return state;
  }
};

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
