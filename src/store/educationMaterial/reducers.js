import { initialState } from './states';

export const educationMaterial = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EDUCATION_MATERIAL_SUCCESS': {
      return Object.assign({}, state, {
        educationMaterial: action.data
      });
    }
    case 'GET_EDUCATION_MATERIALS_SUCCESS': {
      return Object.assign({}, state, {
        educationMaterials: action.data,
        filters: action.filters,
        loading: false
      });
    }
    default:
      return state;
  }
};
