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

const updateExerciseRequest = () => ({
  type: 'UPDATE_EXERCISE_REQUEST'
});

const updateExerciseSuccess = (data) => ({
  type: 'UPDATE_EXERCISE_SUCCESS',
  data
});

const rejectExerciseFail = () => ({
  type: 'REJECT_EXERCISE_FAIL'
});

const rejectExerciseRequest = () => ({
  type: 'REJECT_EXERCISE_REQUEST'
});

const rejectExerciseSuccess = (data) => ({
  type: 'REJECT_EXERCISE_SUCCESS',
  data
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
  createExerciseRequest,
  createExerciseSuccess,
  createExerciseFail,
  updateExerciseRequest,
  updateExerciseSuccess,
  updateExerciseFail,
  rejectExerciseRequest,
  rejectExerciseSuccess,
  rejectExerciseFail,
  deleteExerciseRequest,
  deleteExerciseSuccess,
  deleteExerciseFail,
  clearFilterExercisesRequest,
  downloadExercisesRequest,
  downloadExercisesSuccess,
  downloadExercisesFail,
  uploadExercisesRequest,
  uploadExercisesSuccess,
  uploadExercisesFail
};
