import { Category } from 'services/category';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getCategories = () => async dispatch => {
  // Todo: get categories
};

export const createCategory = payload => async (dispatch) => {
  dispatch(mutation.createCategoryRequest());
  const data = await Category.createCategory(payload);
  if (data.success) {
    dispatch(mutation.createCategorySuccess());
    dispatch(getCategories());
    dispatch(showSuccessNotification('toast_title.new_category', data.message));
    return true;
  } else {
    dispatch(mutation.createCategoryFail());
    dispatch(showErrorNotification('toast_title.new_category', data.message));
    return false;
  }
};
