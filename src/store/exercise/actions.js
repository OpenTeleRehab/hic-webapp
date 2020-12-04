import { Exercise } from 'services/exercise';
import { mutation } from './mutations';
import { showErrorNotification, showSuccessNotification } from 'store/notification/actions';
import { showSpinner } from 'store/spinnerOverlay/actions';

export const getExercises = payload => async dispatch => {
  dispatch(mutation.getExercisesRequest());
  dispatch(showSpinner(true));
  const data = await Exercise.getExercises(payload);
  if (data.success) {
    dispatch(mutation.getExercisesSuccess(data.data, payload));
    dispatch(showSpinner(false));
    return data.info;
  } else {
    dispatch(mutation.getExercisesFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getExercise = id => async dispatch => {
  dispatch(mutation.getExerciseRequest());
  dispatch(showSpinner(true));
  const data = await Exercise.getExercise(id);
  if (data) {
    dispatch(mutation.getExerciseSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getExerciseFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const createExercise = payload => async dispatch => {
  dispatch(mutation.createExercisesRequest());
  const data = await Exercise.createExercise(payload);
  if (data.success) {
    dispatch(mutation.createExercisesSuccess());
    dispatch(getExercises());
    dispatch(showSuccessNotification('toast_title.new_exercise', data.message));
    return true;
  } else {
    dispatch(mutation.createExercisesFail());
    dispatch(showErrorNotification('toast_title.new_exercise', data.message));
    return false;
  }
};

export const updateExercise = (id, payload) => async dispatch => {
  dispatch(mutation.updateExercisesRequest());
  const data = await Exercise.updateExercise(id, payload);
  if (data.success) {
    dispatch(mutation.updateExercisesSuccess());
    dispatch(getExercises());
    dispatch(showSuccessNotification('toast_title.update_exercise', data.message));
    return true;
  } else {
    dispatch(mutation.updateExercisesFail());
    dispatch(showErrorNotification('toast_title.update_exercise', data.message));
    return false;
  }
};

export const deleteExercise = id => async dispatch => {
  dispatch(mutation.deleteExercisesRequest());
  const data = await Exercise.deleteExercise(id);
  if (data.success) {
    dispatch(mutation.deleteExercisesSuccess());
    dispatch(getExercises());
    dispatch(showSuccessNotification('toast_title.delete_exercise', data.message));
    return true;
  } else {
    dispatch(mutation.deleteExercisesFail());
    dispatch(showErrorNotification('toast_title.delete_exercise', data.message));
    return false;
  }
};
