import { initialState } from './states';

export const contribute = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MORE_EXERCISE_SUCCESS': {
      return Object.assign({}, state, {
        exercises: action.data
      });
    }
    case 'ADD_MORE_EDUCATION_MATERIAL_SUCCESS': {
      return Object.assign({}, state, {
        educationMaterials: action.data
      });
    }
    case 'ADD_MORE_QUESTIONNAIRE_SUCCESS': {
      return Object.assign({}, state, {
        questionnaires: action.data
      });
    }
    case 'CLEAR_CONTRIBUTE_SUCCESS': {
      return Object.assign({}, state, {
        exercises: [],
        educationMaterials: [],
        questionnaires: []
      });
    }
    case 'DELETE_EXERCISE_SUCCESS': {
      return Object.assign({}, state, {
        exercises: []
      });
    }
    case 'DELETE_EDUCATION_MATERIAL_SUCCESS': {
      return Object.assign({}, state, {
        educationMaterials: []
      });
    }
    case 'DELETE_QUESTIONNAIRE_SUCCESS': {
      return Object.assign({}, state, {
        questionnaires: []
      });
    }
    default:
      return state;
  }
};
