import { mutation } from './mutations';
import { Contribute } from 'services/contribute';

export const contributeSubmission = (payload) => async dispatch => {
  dispatch(mutation.contributeSubmissionRequest());
  const data = await Contribute.contributeSubmission(payload);

  if (data.success) {
    dispatch(mutation.contributeSubmissionSuccess());
    return true;
  } else {
    dispatch(mutation.contributeSubmissionFail());
    return false;
  }
};

export const addMoreExercise = (payload) => async (dispatch, getState) => {
  const { exercises } = getState().contribute;
  dispatch(mutation.addMoreExerciseSuccess([...exercises, payload]));
};

export const addMoreEducationMaterial = (payload) => async (dispatch, getState) => {
  const { educationMaterials } = getState().contribute;
  dispatch(mutation.addMoreEducationMaterialSuccess([...educationMaterials, payload]));
};

export const addMoreQuestionnaire = (payload) => async (dispatch, getState) => {
  const { questionnaires } = getState().contribute;
  dispatch(mutation.addMoreQuestionnaireSuccess([...questionnaires, payload]));
};

export const updateExercise = (payload) => async (dispatch, getState) => {
  const { exercises } = getState().contribute;
  const newExercises = [];
  exercises.forEach((exercise) => {
    newExercises.push(exercise.id === payload.id ? payload : exercise);
  });
  dispatch(mutation.addMoreExerciseSuccess(newExercises));
};

export const updateEducationMaterial = (payload) => async (dispatch, getState) => {
  const { educationMaterials } = getState().contribute;
  const newEducationMaterials = [];
  educationMaterials.forEach((educationMaterial) => {
    newEducationMaterials.push(educationMaterial.id === payload.id ? payload : educationMaterial);
  });
  dispatch(mutation.addMoreEducationMaterialSuccess(newEducationMaterials));
};

export const updateQuestionnaire = (payload) => async (dispatch, getState) => {
  const { questionnaires } = getState().contribute;
  const newQuestionnaires = [];
  questionnaires.forEach((questionnaire) => {
    newQuestionnaires.push(questionnaire.id === payload.id ? payload : questionnaire);
  });
  dispatch(mutation.addMoreQuestionnaireSuccess(newQuestionnaires));
};

export const deleteExercise = () => async (dispatch) => {
  dispatch(mutation.deleteExerciseSuccess());
};

export const deleteEducationMaterial = () => async (dispatch) => {
  dispatch(mutation.deleteEducationMaterialSuccess());
};

export const deleteQuestionnaire = () => async (dispatch) => {
  dispatch(mutation.deleteQuestionnaireSuccess());
};

export const clearContribute = () => async (dispatch) => {
  dispatch(mutation.clearContributeSuccess());
};
