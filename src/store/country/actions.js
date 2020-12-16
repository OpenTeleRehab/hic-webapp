import { Country } from 'services/country';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';

export const getCountries = () => async dispatch => {
  dispatch(mutation.getCountriesRequest());
  const data = await Country.getCountries();
  if (data.success) {
    dispatch(mutation.getCountriesSuccess(data.data));
  } else {
    dispatch(mutation.getCountriesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

// Actions
export const createCountry = payload => async (dispatch) => {
  dispatch(mutation.createCountryRequest());
  const data = await Country.createCountry(payload);
  if (data.success) {
    dispatch(mutation.createCountrySuccess());
    dispatch(showSuccessNotification('toast_title.new_country', data.message));
    return true;
  } else {
    dispatch(mutation.createContryFail());
    dispatch(showErrorNotification('toast_title.new_country', data.message));
    return false;
  }
};
