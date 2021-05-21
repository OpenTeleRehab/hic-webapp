import { Country } from 'services/country';
import { mutation } from './mutations';
import {
  showErrorNotification,
  showSuccessNotification
} from 'store/notification/actions';
import {
  showSpinner
} from 'store/spinnerOverlay/actions';

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

export const getDefinedCountries = () => async dispatch => {
  dispatch(mutation.getDefinedCountriesRequest());
  const data = await Country.getDefinedCountries();
  if (data.success) {
    dispatch(mutation.getDefinedCountriesSuccess(data.data));
  } else {
    dispatch(mutation.getDefinedCountriesFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

// Actions
export const createCountry = payload => async (dispatch) => {
  dispatch(mutation.createCountryRequest());
  dispatch(showSpinner(true));
  const data = await Country.createCountry(payload);
  if (data.success) {
    dispatch(mutation.createCountrySuccess());
    dispatch(getCountries());
    dispatch(showSuccessNotification('toast_title.new_country', data.message));
    dispatch(showSpinner(false));
    return true;
  } else {
    dispatch(mutation.createCountryFail());
    dispatch(showErrorNotification('toast_title.new_country', data.message));
    dispatch(showSpinner(false));
    return false;
  }
};

export const updateCountry = (id, payload) => async (dispatch) => {
  dispatch(mutation.updateCountryRequest());
  const data = await Country.updateCountry(id, payload);
  if (data.success) {
    dispatch(mutation.updateCountrySuccess());
    dispatch(getCountries());
    dispatch(showSuccessNotification('toast_title.edit_country', data.message));
    return true;
  } else {
    dispatch(mutation.updateCountryFail());
    dispatch(showErrorNotification('toast_title.edit_country', data.message));
    return false;
  }
};

export const deleteCountry = id => async (dispatch, getState) => {
  dispatch(mutation.deleteCountryRequest());
  const data = await Country.deleteCountry(id);
  if (data.success) {
    dispatch(mutation.deleteCountrySuccess());
    const filters = getState().country.filters;
    dispatch(getCountries(filters));
    dispatch(showSuccessNotification('toast_title.delete_country', data.message));
    return true;
  } else {
    dispatch(mutation.deleteCountryFail());
    dispatch(showErrorNotification('toast_title.delete_country', data.message));
    return false;
  }
};
