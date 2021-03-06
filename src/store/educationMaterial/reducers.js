import { initialState } from './states';

export const educationMaterial = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EDUCATION_MATERIAL_SUCCESS': {
      return Object.assign({}, state, {
        educationMaterial: action.data
      });
    }
    case 'GET_EDIT_TRANSLATION_SUCCESS': {
      return Object.assign({}, state, {
        editTranslation: action.data
      });
    }
    case 'GET_EDUCATION_MATERIALS_SUCCESS': {
      return Object.assign({}, state, {
        educationMaterials: action.data,
        filters: action.filters,
        loading: false
      });
    }
    case 'CLEAR_FILTER_EDUCATION_MATERIALS_REQUEST': {
      return Object.assign({}, state, {
        filters: {}
      });
    }
    case 'CLEAR_EDIT_TRANSLATION_REQUEST': {
      return Object.assign({}, state, {
        editTranslation: {}
      });
    }
    case 'SET_FILTER_EDUCATION_MATERIALS_REQUEST': {
      return Object.assign({}, state, {
        filters: {
          filter: action.data
        }
      });
    }
    case 'GET_EDUCATION_MATERIAL_BY_SLUG_SUCCESS': {
      return Object.assign({}, state, {
        educationMaterialBySlug: action.data
      });
    }
    default:
      return state;
  }
};
