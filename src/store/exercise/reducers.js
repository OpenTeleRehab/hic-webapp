import { initialState } from './states';

export const exercise = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXERCISES_REQUEST': {
      return Object.assign({}, state, {
        loading: true
      });
    }
    case 'GET_EXERCISES_SUCCESS': {
      return Object.assign({}, state, {
        exercises: action.data,
        filters: action.filters,
        totalCount: action.info.total_count,
        loading: false
      });
    }
    case 'GET_EXERCISES_FAIL': {
      return Object.assign({}, state, {
        loading: false
      });
    }
    case 'GET_EXERCISE_SUCCESS': {
      return Object.assign({}, state, {
        exercise: action.data
      });
    }
    case 'GET_EDIT_TRANSLATION_SUCCESS': {
      return Object.assign({}, state, {
        editTranslation: action.data
      });
    }
    case 'CLEAR_FILTER_EXERCISES_REQUEST': {
      return Object.assign({}, state, {
        filters: {}
      });
    }
    case 'CLEAR_EDIT_TRANSLATION_REQUEST': {
      return Object.assign({}, state, {
        editTranslation: {}
      });
    }
    case 'SET_FILTER_EXERCISES_REQUEST': {
      return Object.assign({}, state, {
        filters: {
          filter: action.data
        }
      });
    }
    case 'GET_EXERCISE_BY_SLUG_SUCCESS': {
      return Object.assign({}, state, {
        exerciseBySlug: action.data
      });
    }
    default:
      return state;
  }
};
