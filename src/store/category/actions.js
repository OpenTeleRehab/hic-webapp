import { Category } from 'services/category';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getCategories = payload => async dispatch => {
  dispatch(mutation.getCategoriesRequest());
  const data = await Category.getCategories(payload);
  if (data.success) {
    dispatch(mutation.getCategoriesSuccess(data.data));
  } else {
    dispatch(mutation.getCategoriesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const createCategory = payload => async (dispatch) => {
  dispatch(mutation.createCategoryRequest());
  const data = await Category.createCategory(payload);
  if (data.success) {
    dispatch(mutation.createCategorySuccess());
    dispatch(getCategories({ type: payload.type }));
    dispatch(showSuccessNotification('toast_title.new_category', data.message));
    return true;
  } else {
    dispatch(mutation.createCategoryFail());
    dispatch(showErrorNotification('toast_title.new_category', data.message));
    return false;
  }
};

export const updateCategory = (id, payload) => async (dispatch) => {
  dispatch(mutation.updateCategoryRequest());
  const data = await Category.updateCategory(id, payload);
  if (data.success) {
    dispatch(mutation.updateCategorySuccess());
    dispatch(getCategories({ type: payload.type }));
    dispatch(showSuccessNotification('toast_title.edit_category', data.message));
    return true;
  } else {
    dispatch(mutation.updateCategoryFail());
    dispatch(showErrorNotification('toast_title.edit_category', data.message));
    return false;
  }
};
