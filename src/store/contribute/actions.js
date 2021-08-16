import { mutation } from './mutations';

export const addMoreExercise = (payload) => async (dispatch, getState) => {
  const { exercises } = getState().contribute;
  dispatch(mutation.addMoreExerciseSuccess([...exercises, payload]));
};

export const addMoreEducationMaterial = (payload) => async (dispatch, getState) => {
  const { educationMaterials } = getState().contribute;
  dispatch(mutation.addMoreEducationMaterialSuccess([...educationMaterials, payload]));
};

export const deleteExercise = () => async (dispatch) => {
  dispatch(mutation.deleteExerciseSuccess());
};

export const deleteEducationMaterial = () => async (dispatch) => {
  dispatch(mutation.deleteEducationMaterialSuccess());
};
