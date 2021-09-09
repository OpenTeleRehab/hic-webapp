import { Questionnaire } from 'services/questionnaire';
import { mutation } from './mutations';
import { showErrorNotification, showSuccessNotification } from 'store/notification/actions';
import { showSpinner } from '../spinnerOverlay/actions';
import { STATUS } from '../../variables/resourceStatus';
import { getTranslate } from 'react-localize-redux';

export const getQuestionnaires = payload => async dispatch => {
  dispatch(mutation.getQuestionnairesRequest());
  const data = await Questionnaire.getQuestionnaires(payload);
  if (data.success) {
    dispatch(mutation.getQuestionnairesSuccess(data.data, payload));
    return data.info;
  } else {
    dispatch(mutation.getQuestionnairesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getQuestionnaire = (id, language) => async dispatch => {
  dispatch(mutation.getQuestionnaireRequest());
  dispatch(showSpinner(true));
  const data = await Questionnaire.getQuestionnaire(id, language);
  if (data) {
    dispatch(mutation.getQuestionnaireSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getQuestionnaireFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getEditTranslation = (id, language) => async dispatch => {
  dispatch(mutation.getEditTranslationRequest());
  const data = await Questionnaire.getQuestionnaire(id, language);
  if (data) {
    dispatch(mutation.getEditTranslationSuccess(data.data));
  } else {
    dispatch(mutation.getEditTranslationFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const createQuestionnaire = (payload) => async dispatch => {
  dispatch(mutation.createQuestionnaireRequest());
  const data = await Questionnaire.createQuestionnaire(payload);
  if (data.success) {
    dispatch(mutation.createQuestionnaireSuccess());
    dispatch(showSuccessNotification('toast_title.new_questionnaire', data.message));
    return true;
  } else {
    dispatch(mutation.createQuestionnaireFail());
    dispatch(showErrorNotification('toast_title.new_questionnaire', data.message));
    return false;
  }
};

export const contributeQuestionnaire = (payloads, formFields) => async dispatch => {
  dispatch(mutation.contributeQuestionnaireRequest());
  const data = await Questionnaire.contributeQuestionnaire(payloads, formFields);
  if (data) {
    dispatch(mutation.contributeQuestionnaireSuccess());
    return true;
  } else {
    dispatch(mutation.contributeQuestionnaireFail());
    return false;
  }
};

export const updateQuestionnaire = (id, payload) => async (dispatch, getState) => {
  dispatch(mutation.updateQuestionnaireRequest());
  const data = await Questionnaire.updateQuestionnaire(id, payload);
  const questionnaire = getState().questionnaire.questionnaire;
  const translate = getTranslate(getState().localize);
  if (data.success) {
    dispatch(mutation.updateQuestionnaireSuccess());
    dispatch(showSuccessNotification(questionnaire.status === STATUS.approved ? 'toast_title.save_questionnaire' : 'toast_title.approve_questionnaire', data.message, { status: questionnaire.status === STATUS.approved ? translate('questionnaire.saved') : translate('questionnaire.approved') }));
    return true;
  } else {
    dispatch(mutation.updateQuestionnaireFail());
    dispatch(showErrorNotification('toast_title.update_questionnaire', data.message));
    return false;
  }
};

export const approveEditTranslation = (id, payload, mediaUploads) => async (dispatch) => {
  dispatch(mutation.approveEditTranslationRequest());
  const data = await Questionnaire.approveEditTranslation(id, payload, mediaUploads);
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

export const rejectQuestionnaire = (id) => async dispatch => {
  dispatch(mutation.rejectQuestionnaireRequest());
  const data = await Questionnaire.rejectQuestionnaire(id);
  if (data.success) {
    dispatch(mutation.rejectQuestionnaireSuccess());
    dispatch(showSuccessNotification('toast_title.reject_questionnaire', data.message));
    return true;
  } else {
    dispatch(mutation.rejectQuestionnaireFail());
    dispatch(showErrorNotification('toast_title.reject_questionnaire', data.message));
    return false;
  }
};

export const rejectEditTranslation = (id) => async dispatch => {
  dispatch(mutation.rejectEditTranslationRequest());
  const data = await Questionnaire.rejectEditTranslation(id);
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

export const deleteQuestionnaire = id => async (dispatch, getState) => {
  dispatch(mutation.deleteQuestionnaireRequest());
  const data = await Questionnaire.deleteQuestionnaire(id);
  if (data.success) {
    dispatch(mutation.deleteQuestionnaireSuccess());
    const filters = getState().questionnaire.filters;
    dispatch(getQuestionnaires(filters));
    dispatch(showSuccessNotification('toast_title.delete_questionnaire', data.message));
    return true;
  } else {
    dispatch(mutation.deleteQuestionnaireFail());
    dispatch(showErrorNotification('toast_title.delete_questionnaire', data.message));
    return false;
  }
};

export const clearFilterQuestionnaires = () => async dispatch => {
  dispatch(mutation.clearFilterQuestionnairesRequest());
};

export const clearEditTranslation = () => async dispatch => {
  dispatch(mutation.clearEditTranslationRequest());
};
