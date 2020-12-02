const getExercisesRequest = () => ({
  type: 'GET_EXERCISES_REQUEST'
});

const getExercisesSuccess = (data) => ({
  type: 'GET_EXERCISES_SUCCESS',
  data
});

const getExercisesFail = () => ({
  type: 'GET_EXERCISES_FAIL'
});

const createExercisesRequest = () => ({
  type: 'CREATE_EXERCISES_REQUEST'
});

const createExercisesSuccess = (data) => ({
  type: 'CREATE_EXERCISES_SUCCESS',
  data
});

const createExercisesFail = () => ({
  type: 'CREATE_EXERCISES_FAIL'
});

export const mutation = {
  getExercisesFail,
  getExercisesRequest,
  getExercisesSuccess,
  createExercisesRequest,
  createExercisesSuccess,
  createExercisesFail
};
