import { staticPage } from 'services/staticPage';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getStaticPages = () => async dispatch => {
  dispatch(mutation.getStaticPagesRequest());
  const data = await staticPage.getStaticPages();
  if (data.success) {
    dispatch(mutation.getStaticPagesSuccess(data.data));
  } else {
    dispatch(mutation.getStaticPagesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

// Actions
export const createStaticPage = payload => async (dispatch) => {
  dispatch(mutation.createStaticPageRequest());
  const data = await staticPage.createStaticPage(payload);
  if (data.success) {
    dispatch(mutation.createStaticPageSuccess());
    dispatch(getStaticPages());
    dispatch(showSuccessNotification('toast_title.new_static_page', data.message));
    return true;
  } else {
    dispatch(mutation.createStaticPagesFail());
    dispatch(showErrorNotification('toast_title.new_static_page', data.message));
    return false;
  }
};
