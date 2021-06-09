import { Disease } from 'services/disease';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';
import {
  showSpinner
} from 'store/spinnerOverlay/actions';

export const getDiseases = () => async dispatch => {
  dispatch(mutation.getDiseasesRequest());
  const data = await Disease.getDiseases();
  if (data.success) {
    dispatch(mutation.getDiseasesSuccess(data.data));
  } else {
    dispatch(mutation.getDiseasesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

// Actions
export const createDisease = payload => async (dispatch) => {
  dispatch(mutation.createDiseaseRequest());
  dispatch(showSpinner(true));
  const data = await Disease.createDisease(payload);
  if (data.success) {
    dispatch(mutation.createDiseaseSuccess());
    dispatch(getDiseases());
    dispatch(showSuccessNotification('toast_title.new_disease', data.message));
    dispatch(showSpinner(false));
    return true;
  } else {
    dispatch(mutation.createDiseaseFail());
    dispatch(showErrorNotification('toast_title.new_disease', data.message));
    dispatch(showSpinner(false));
    return false;
  }
};

export const updateDisease = (id, payload) => async (dispatch) => {
  dispatch(mutation.updateDiseaseSuccess());
  const data = await Disease.updateDisease(id, payload);
  if (data.success) {
    dispatch(mutation.updateDiseaseSuccess());
    dispatch(getDiseases());
    dispatch(showSuccessNotification('toast_title.edit_disease', data.message));
    return true;
  } else {
    dispatch(mutation.updateDiseaseFail());
    dispatch(showErrorNotification('toast_title.edit_disease', data.message));
    return false;
  }
};

export const deleteDisease = id => async (dispatch) => {
  dispatch(mutation.deleteDiseaseRequest());
  const data = await Disease.deleteDisease(id);
  if (data.success) {
    dispatch(mutation.deleteDiseaseSuccess());
    dispatch(getDiseases());
    dispatch(showSuccessNotification('toast_title.delete_disease', data.message));
    return true;
  } else {
    dispatch(mutation.deleteDiseaseFail());
    dispatch(showErrorNotification('toast_title.delete_disease', data.message));
    return false;
  }
};

export const uploadDiseases = payload => async dispatch => {
  dispatch(mutation.uploadDiseasesRequest());
  const data = await Disease.uploadDiseases(payload);
  if (data.success) {
    dispatch(mutation.uploadDiseasesSuccess());
    dispatch(getDiseases());
    dispatch(showSuccessNotification('toast_title.upload_diseases', data.message));
    return { success: true, info: data.info };
  } else {
    dispatch(mutation.uploadDiseasesFail());
    dispatch(showErrorNotification('toast_title.upload_diseases', data.message, { number: data.errors.row }));
    return { success: false, info: data.errors };
  }
};
