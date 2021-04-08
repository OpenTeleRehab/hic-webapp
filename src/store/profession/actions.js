import { Profession } from 'services/profession';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getProfessions = () => async dispatch => {
  dispatch(mutation.getProfessionRequest());
  const data = await Profession.getProfession();
  if (data.success) {
    dispatch(mutation.getProfessionsSuccess(data.data));
  } else {
    dispatch(mutation.getProfessionsFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

// Actions
export const createProfession = payload => async (dispatch) => {
  dispatch(mutation.createProfessionRequest());
  const data = await Profession.createProfession(payload);
  if (data.success) {
    dispatch(mutation.createProfessionsSuccess());
    dispatch(getProfessions());
    dispatch(showSuccessNotification('toast_title.new_profession', data.message));
    return true;
  } else {
    dispatch(mutation.createProfessionsFail());
    dispatch(showErrorNotification('toast_title.new_profession', data.message));
    return false;
  }
};

export const updateProfession = (id, payload) => async (dispatch) => {
  dispatch(mutation.updateProfessionsSuccess());
  const data = await Profession.updateProfession(id, payload);
  if (data.success) {
    dispatch(mutation.updateProfessionsSuccess());
    dispatch(getProfessions());
    dispatch(showSuccessNotification('toast_title.edit_profession', data.message));
    return true;
  } else {
    dispatch(mutation.updateProfessionsFail());
    dispatch(showErrorNotification('toast_title.edit_profession', data.message));
    return false;
  }
};

export const deleteProfession = id => async (dispatch) => {
  dispatch(mutation.deleteProfessionRequest());
  const data = await Profession.deleteProfession(id);
  if (data.success) {
    dispatch(mutation.deleteProfessionSuccess());
    dispatch(getProfessions());
    dispatch(showSuccessNotification('toast_title.delete_profession', data.message));
    return true;
  } else {
    dispatch(mutation.deleteProfessionFail());
    dispatch(showErrorNotification('toast_title.delete_profession', data.message));
    return false;
  }
};
