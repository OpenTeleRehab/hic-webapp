import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  addTranslationForLanguage,
  initialize,
  localizeReducer
} from 'react-localize-redux';

import { getCountries } from 'store/country/actions';
import { getClinics } from 'store/clinic/actions';
import { getProfessions } from 'store/profession/actions';

import { user } from 'store/user/reducers';
import { therapist } from 'store/therapist/reducers';
import { notification } from 'store/notification/reducers';
import { spinnerOverlay } from 'store/spinnerOverlay/reducers';
import { country } from 'store/country/reducers';
import { clinic } from 'store/clinic/reducers';
import { profession } from 'store/profession/reducers';

import en from 'translations/en.locale.json';

export const rootReducer = {
  localize: localizeReducer,
  user,
  therapist,
  notification,
  spinnerOverlay,
  country,
  clinic,
  profession
};

const devTool =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose;

const store = createStore(
  combineReducers(rootReducer),
  compose(
    applyMiddleware(thunkMiddleware),
    devTool
  )
);

const languages = [{ name: 'English', code: 'en' }];
const defaultLanguage = 'en';
const onMissingTranslation = ({ translationId }) => translationId;

store.dispatch(initialize({
  languages,
  options: {
    defaultLanguage,
    renderToStaticMarkup,
    onMissingTranslation
  }
}));

store.dispatch(addTranslationForLanguage(en, 'en'));

// fetch countries
store.dispatch(getCountries());

// fetch clinics
store.dispatch(getClinics());

// fetch professions
store.dispatch(getProfessions());

export default store;
