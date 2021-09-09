import { saveAs } from 'file-saver';
import { Exercise } from 'services/exercise';
import { mutation } from './mutations';
import { showErrorNotification, showSuccessNotification } from 'store/notification/actions';
import { showSpinner } from 'store/spinnerOverlay/actions';
import { STATUS } from '../../variables/resourceStatus';
import { getTranslate } from 'react-localize-redux';

export const getExercises = payload => async dispatch => {
  dispatch(mutation.getExercisesRequest());
  const data = await Exercise.getExercises(payload);
  if (data.success) {
    dispatch(mutation.getExercisesSuccess(data.data, payload, data.info));
  } else {
    dispatch(mutation.getExercisesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getExercise = (id, language) => async dispatch => {
  dispatch(mutation.getExerciseRequest());
  dispatch(showSpinner(true));
  const data = await Exercise.getExercise(id, language);
  if (data) {
    dispatch(mutation.getExerciseSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getExerciseFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getEditTranslation = (id, language) => async dispatch => {
  dispatch(mutation.getEditTranslationRequest());
  const data = await Exercise.getExercise(id, language);
  if (data) {
    dispatch(mutation.getEditTranslationSuccess(data.data));
  } else {
    dispatch(mutation.getEditTranslationFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const createExercise = (payload, mediaUploads) => async dispatch => {
  dispatch(mutation.createExerciseRequest());
  const data = await Exercise.createExercise(payload, mediaUploads);
  if (data.success) {
    dispatch(mutation.createExerciseSuccess());
    dispatch(showSuccessNotification('toast_title.new_exercise', data.message));
    return true;
  } else {
    dispatch(mutation.createExerciseFail());
    dispatch(showErrorNotification('toast_title.new_exercise', data.message));
    return false;
  }
};

export const contributeExercise = (payloads, formFields) => async dispatch => {
  dispatch(mutation.contributeExerciseRequest());
  const data = await Exercise.contributeExercise(payloads, formFields);
  if (data) {
    dispatch(mutation.contributeExerciseSuccess());
    return true;
  } else {
    dispatch(mutation.contributeExerciseFail());
    return false;
  }
};

export const approveExercise = (id, payload, mediaUploads) => async (dispatch, getState) => {
  const exercise = getState().exercise.exercise;
  const translate = getTranslate(getState().localize);
  dispatch(mutation.updateExerciseRequest());
  const data = await Exercise.updateExercise(id, payload, mediaUploads);
  if (data.success) {
    dispatch(mutation.updateExerciseSuccess());
    dispatch(showSuccessNotification(exercise.status === STATUS.approved ? 'toast_title.save_exercise' : 'toast_title.approve_exercise', data.message, { status: exercise.status === STATUS.approved ? translate('exercise.saved') : translate('exercise.approved') }));
    return true;
  } else {
    dispatch(mutation.updateExerciseFail());
    dispatch(showErrorNotification(exercise.status === STATUS.approved ? 'toast_title.save_exercise' : 'toast_title.approve_exercise', data.message));
    return false;
  }
};

export const approveEditTranslation = (id, payload, mediaUploads) => async (dispatch) => {
  dispatch(mutation.approveEditTranslationRequest());
  const data = await Exercise.approveEditTranslation(id, payload, mediaUploads);
  if (data.success) {
    dispatch(mutation.approveEditTranslationSuccess());
    dispatch(showSuccessNotification('toast_title.edit_translation.approve', 'success_message.edit_translation.approve'));
    return true;
  } else {
    dispatch(mutation.approveEditTranslationFail());
    dispatch(showSuccessNotification('toast_title.edit_translation.approve', 'success_message.edit_translation.approve'));
    return false;
  }
};

export const rejectExercise = (id) => async dispatch => {
  dispatch(mutation.rejectExerciseRequest());
  const data = await Exercise.rejectExercise(id);
  if (data.success) {
    dispatch(mutation.rejectExerciseSuccess());
    dispatch(showSuccessNotification('toast_title.reject_exercise', data.message));
    return true;
  } else {
    dispatch(mutation.rejectExerciseFail());
    dispatch(showErrorNotification('toast_title.reject_exercise', data.message));
    return false;
  }
};

export const rejectEditTranslation = (id) => async dispatch => {
  dispatch(mutation.rejectEditTranslationRequest());
  const data = await Exercise.rejectEditTranslation(id);
  if (data.success) {
    dispatch(mutation.rejectEditTranslationSuccess());
    dispatch(showSuccessNotification('toast_title.edit_translation.reject', 'success_message.edit_translation.reject'));
    return true;
  } else {
    dispatch(mutation.rejectEditTranslationFail());
    dispatch(showErrorNotification('toast_title.edit_translation.reject', 'success_message.edit_translation.reject'));
    return false;
  }
};

export const deleteExercise = id => async (dispatch, getState) => {
  dispatch(mutation.deleteExerciseRequest());
  const data = await Exercise.deleteExercise(id);
  if (data.success) {
    dispatch(mutation.deleteExerciseSuccess());
    const filters = getState().exercise.filters;
    dispatch(getExercises(filters));
    dispatch(showSuccessNotification('toast_title.delete_exercise', data.message));
    return true;
  } else {
    dispatch(mutation.deleteExerciseFail());
    dispatch(showErrorNotification('toast_title.delete_exercise', data.message));
    return false;
  }
};

export const clearFilterExercises = () => async dispatch => {
  dispatch(mutation.clearFilterExercisesRequest());
};

export const clearEditTranslation = () => async dispatch => {
  dispatch(mutation.clearEditTranslationRequest());
};

export const downloadExercises = payload => async dispatch => {
  dispatch(mutation.downloadExercisesRequest());
  const res = await Exercise.downloadExercises(payload);
  if (res) {
    dispatch(mutation.downloadExercisesSuccess());
    saveAs(res, 'Exercise.csv');
    return true;
  } else {
    dispatch(mutation.downloadExercisesFail());
    dispatch(showErrorNotification('toast_title.error_message', res.message));
    return false;
  }
};

export const uploadExercises = payload => async dispatch => {
  dispatch(mutation.uploadExercisesRequest());
  const data = await Exercise.uploadExercises(payload);
  if (data.success) {
    dispatch(mutation.uploadExercisesSuccess());
    dispatch(showSuccessNotification('toast_title.upload_exercises', data.message));
    return { success: true, info: data.info };
  } else {
    dispatch(mutation.uploadExercisesFail());
    dispatch(showErrorNotification('toast_title.upload_exercises', data.message));
    return { success: false, info: data.errors };
  }
};
