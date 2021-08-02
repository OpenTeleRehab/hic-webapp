import { mutation } from './mutations';

export const addMoreExercise = (payload) => async (dispatch, getState) => {
  const { exercises } = getState().contribute;
  dispatch(mutation.addMoreExerciseSuccess([...exercises, payload]));
};

export const deleteExercise = () => async (dispatch) => {
  dispatch(mutation.deleteExerciseSuccess());
};
