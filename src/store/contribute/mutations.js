const contributeSubmissionRequest = () => ({
  type: 'CONTRIBUTE_SUBMISSION_REQUEST'
});

const contributeSubmissionSuccess = () => ({
  type: 'CONTRIBUTE_SUBMISSION_SUCCESS'
});

const contributeSubmissionFail = () => ({
  type: 'CONTRIBUTE_SUBMISSION_FAIL'
});

const addMoreExerciseSuccess = (data) => ({
  type: 'ADD_MORE_EXERCISE_SUCCESS',
  data
});

const addMoreEducationMaterialSuccess = (data) => ({
  type: 'ADD_MORE_EDUCATION_MATERIAL_SUCCESS',
  data
});

const addMoreQuestionnaireSuccess = (data) => ({
  type: 'ADD_MORE_QUESTIONNAIRE_SUCCESS',
  data
});

const clearContributeSuccess = () => ({
  type: 'CLEAR_CONTRIBUTE_SUCCESS'
});

const deleteExerciseSuccess = () => ({
  type: 'DELETE_EXERCISE_SUCCESS'
});

const deleteEducationMaterialSuccess = () => ({
  type: 'DELETE_EDUCATION_MATERIAL_SUCCESS'
});

const deleteQuestionnaireSuccess = () => ({
  type: 'DELETE_QUESTIONNAIRE_SUCCESS'
});

export const mutation = {
  contributeSubmissionRequest,
  contributeSubmissionSuccess,
  contributeSubmissionFail,
  addMoreExerciseSuccess,
  addMoreEducationMaterialSuccess,
  addMoreQuestionnaireSuccess,
  clearContributeSuccess,
  deleteExerciseSuccess,
  deleteEducationMaterialSuccess,
  deleteQuestionnaireSuccess
};
