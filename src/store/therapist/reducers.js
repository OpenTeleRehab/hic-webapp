import { initialState } from './states';

export const therapist = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_THERAPISTS_SUCCESS': {
      return Object.assign({}, state, {
        therapists: action.data,
        filters: action.filters
      });
    }
    case 'GET_THERAPIST_BY_CLINIC_SUCCESS': {
      return Object.assign({}, state, {
        therapists: action.data
      });
    }
    default:
      return state;
  }
};

export const patient = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PATIENT_SUCCESS': {
      return Object.assign({}, state, {
        patients: action.data
      });
    }
    case 'GET_PATIENT_BY_CLINIC_SUCCESS': {
      return Object.assign({}, state, {
        patients: action.data
      });
    }
    default:
      return state;
  }
};
