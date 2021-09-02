import { EducationMaterial } from 'services/educationMaterial';
import { mutation } from './mutations';
import { showErrorNotification, showSuccessNotification } from 'store/notification/actions';
import { showSpinner } from '../spinnerOverlay/actions';
import { getTranslate } from 'react-localize-redux';
import { STATUS } from '../../variables/resourceStatus';

export const getEducationMaterial = (id, language) => async dispatch => {
  dispatch(mutation.getEducationMaterialRequest());
  dispatch(showSpinner(true));
  const data = await EducationMaterial.getEducationMaterial(id, language);
  if (data) {
    dispatch(mutation.getEducationMaterialSuccess(data.data));
    dispatch(showSpinner(false));
  } else {
    dispatch(mutation.getEducationMaterialFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getEducationMaterials = payload => async dispatch => {
  dispatch(mutation.getEducationMaterialsRequest());
  const data = await EducationMaterial.getEducationMaterials(payload);
  if (data.success) {
    dispatch(mutation.getEducationMaterialsSuccess(data.data, payload));
    return data.info;
  } else {
    dispatch(mutation.getEducationMaterialsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const createEducationMaterial = (payload) => async dispatch => {
  dispatch(mutation.createEducationMaterialRequest());
  const data = await EducationMaterial.createEducationMaterial(payload);
  if (data.success) {
    dispatch(mutation.createEducationMaterialSuccess());
    dispatch(showSuccessNotification('toast_title.new_education_material', data.message));
    return true;
  } else {
    dispatch(mutation.createEducationMaterialFail());
    dispatch(showErrorNotification('toast_title.new_education_material', data.message));
    return false;
  }
};

export const contributeEducationMaterial = (payloads, formFields) => async dispatch => {
  dispatch(mutation.contributeEducationMaterialRequest());
  const data = await EducationMaterial.contributeEducationMaterial(payloads, formFields);
  if (data) {
    dispatch(mutation.contributeEducationMaterialSuccess());
    return true;
  } else {
    dispatch(mutation.contributeEducationMaterialFail());
    return false;
  }
};

export const approveEducationMaterial = (id, payload, mediaUploads) => async (dispatch, getState) => {
  const educationMaterial = getState().educationMaterial.educationMaterial;
  const translate = getTranslate(getState().localize);
  dispatch(mutation.updateEducationMaterialRequest());
  const data = await EducationMaterial.updateEducationMaterial(id, payload, mediaUploads);
  if (data.success) {
    dispatch(mutation.updateEducationMaterialSuccess());
    dispatch(showSuccessNotification(educationMaterial.status === STATUS.approved ? 'toast_title.save_education_material' : 'toast_title.approve_education_material', data.message, { status: educationMaterial.status === STATUS.approved ? translate('education_material.saved') : translate('education_material.approved') }));
    return true;
  } else {
    dispatch(mutation.updateEducationMaterialFail());
    dispatch(showErrorNotification(educationMaterial.status === STATUS.approved ? 'toast_title.save_education_material' : 'toast_title.approve_education_material', data.message));
    return false;
  }
};

export const rejectEducationMaterial = (id) => async dispatch => {
  dispatch(mutation.rejectEducationMaterialRequest());
  const data = await EducationMaterial.rejectEducationMaterial(id);
  if (data.success) {
    dispatch(mutation.rejectEducationMaterialSuccess());
    dispatch(showSuccessNotification('toast_title.reject_education_material', data.message));
    return true;
  } else {
    dispatch(mutation.rejectEducationMaterialFail());
    dispatch(showErrorNotification('toast_title.reject_education_material', data.message));
    return false;
  }
};

export const deleteEducationMaterial = id => async (dispatch, getState) => {
  dispatch(mutation.deleteEducationMaterialRequest());
  const data = await EducationMaterial.deleteEducationMaterial(id);
  if (data.success) {
    dispatch(mutation.deleteEducationMaterialSuccess());
    const filters = getState().educationMaterial.filters;
    dispatch(getEducationMaterials(filters));
    dispatch(showSuccessNotification('toast_title.delete_education_material', data.message));
    return true;
  } else {
    dispatch(mutation.deleteEducationMaterialFail());
    dispatch(showErrorNotification('toast_title.delete_education_material', data.message));
    return false;
  }
};

export const clearFilterEducationMaterials = () => async dispatch => {
  dispatch(mutation.clearFilterEducationMaterialsRequest());
};
