const getExercisesRequest = () => ({
  type: 'GET_EXERCISES_REQUEST'
});

const getExercisesSuccess = (data, filters, info) => ({
  type: 'GET_EXERCISES_SUCCESS',
  data,
  filters,
  info
});

const getExercisesFail = () => ({
  type: 'GET_EXERCISES_FAIL'
});

const getExerciseRequest = () => ({
  type: 'GET_EXERCISE_REQUEST'
});

const getExerciseSuccess = (data) => ({
  type: 'GET_EXERCISE_SUCCESS',
  data
});

const getExerciseFail = () => ({
  type: 'GET_EXERCISE_FAIL'
});

const getEditTranslationRequest = () => ({
  type: 'GET_EDIT_TRANSLATION_REQUEST'
});

const getEditTranslationSuccess = (data) => ({
  type: 'GET_EDIT_TRANSLATION_SUCCESS',
  data
});

const getEditTranslationFail = () => ({
  type: 'GET_EDIT_TRANSLATION_FAIL'
});

const createExerciseRequest = () => ({
  type: 'CREATE_EXERCISE_REQUEST'
});

const createExerciseSuccess = (data) => ({
  type: 'CREATE_EXERCISE_SUCCESS',
  data
});

const createExerciseFail = () => ({
  type: 'CREATE_EXERCISE_FAIL'
});

const contributeExerciseRequest = () => ({
  type: 'CONTRIBUTE_EXERCISE_REQUEST'
});

const contributeExerciseSuccess = (data) => ({
  type: 'CONTRIBUTE_EXERCISE_SUCCESS',
  data
});

const contributeExerciseFail = () => ({
  type: 'CONTRIBUTE_EXERCISE_FAIL'
});

const updateExerciseRequest = () => ({
  type: 'UPDATE_EXERCISE_REQUEST'
});

const updateExerciseSuccess = (data) => ({
  type: 'UPDATE_EXERCISE_SUCCESS',
  data
});

const rejectExerciseRequest = () => ({
  type: 'REJECT_EXERCISE_REQUEST'
});

const rejectExerciseSuccess = (data) => ({
  type: 'REJECT_EXERCISE_SUCCESS',
  data
});

const rejectExerciseFail = () => ({
  type: 'REJECT_EXERCISE_FAIL'
});

const rejectEditTranslationRequest = () => ({
  type: 'REJECT_EDIT_TRANSLATION_REQUEST'
});

const rejectEditTranslationSuccess = (data) => ({
  type: 'REJECT_EDIT_TRANSLATION_SUCCESS',
  data
});

const rejectEditTranslationFail = () => ({
  type: 'REJECT_EDIT_TRANSLATION_FAIL'
});

const approveEditTranslationRequest = () => ({
  type: 'APPROVE_EDIT_TRANSLATION_REQUEST'
});

const approveEditTranslationSuccess = (data) => ({
  type: 'APPROVE_EDIT_TRANSLATION_SUCCESS',
  data
});

const approveEditTranslationFail = () => ({
  type: 'APPROVE_EDIT_TRANSLATION_FAIL'
});

const updateExerciseFail = () => ({
  type: 'UPDATE_EXERCISE_FAIL'
});

const deleteExerciseRequest = () => ({
  type: 'DELETE_EXERCISE_REQUEST'
});

const deleteExerciseSuccess = (data) => ({
  type: 'DELETE_EXERCISE_SUCCESS',
  data
});

const deleteExerciseFail = () => ({
  type: 'DELETE_EXERCISE_FAIL'
});

const clearFilterExercisesRequest = () => ({
  type: 'CLEAR_FILTER_EXERCISES_REQUEST'
});

const clearEditTranslationRequest = () => ({
  type: 'CLEAR_EDIT_TRANSLATION_REQUEST'
});

const downloadExercisesRequest = () => ({
  type: 'DOWNLOAD_EXERCISES_REQUEST'
});

const downloadExercisesSuccess = () => ({
  type: 'DOWNLOAD_EXERCISES_SUCCESS'
});

const downloadExercisesFail = () => ({
  type: 'DOWNLOAD_EXERCISES_FAIL'
});

const uploadExercisesRequest = () => ({
  type: 'UPLOAD_EXERCISES_REQUEST'
});

const uploadExercisesSuccess = () => ({
  type: 'UPLOAD_EXERCISES_SUCCESS'
});

const uploadExercisesFail = () => ({
  type: 'UPLOAD_EXERCISES_FAIL'
});

export const mutation = {
  getExercisesFail,
  getExercisesRequest,
  getExercisesSuccess,
  getExerciseRequest,
  getExerciseSuccess,
  getExerciseFail,
  getEditTranslationRequest,
  getEditTranslationSuccess,
  getEditTranslationFail,
  createExerciseRequest,
  createExerciseSuccess,
  createExerciseFail,
  contributeExerciseRequest,
  contributeExerciseSuccess,
  contributeExerciseFail,
  updateExerciseRequest,
  updateExerciseSuccess,
  updateExerciseFail,
  rejectExerciseRequest,
  rejectExerciseSuccess,
  rejectExerciseFail,
  rejectEditTranslationRequest,
  rejectEditTranslationSuccess,
  rejectEditTranslationFail,
  approveEditTranslationRequest,
  approveEditTranslationSuccess,
  approveEditTranslationFail,
  deleteExerciseRequest,
  deleteExerciseSuccess,
  deleteExerciseFail,
  clearFilterExercisesRequest,
  clearEditTranslationRequest,
  downloadExercisesRequest,
  downloadExercisesSuccess,
  downloadExercisesFail,
  uploadExercisesRequest,
  uploadExercisesSuccess,
  uploadExercisesFail
};
