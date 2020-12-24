import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  initialize,
  localizeReducer
} from 'react-localize-redux';

import { user } from 'store/user/reducers';
import { therapist } from 'store/therapist/reducers';
import { notification } from 'store/notification/reducers';
import { spinnerOverlay } from 'store/spinnerOverlay/reducers';
import { country } from 'store/country/reducers';
import { clinic } from 'store/clinic/reducers';
import { profession } from 'store/profession/reducers';
import { defaultLimitedPatient } from 'store/setting/reducers';
import { language } from 'store/language/reducers';
import { auth } from 'store/auth/reducers';
import { exercise } from 'store/exercise/reducers';
import { localization } from 'store/localization/reducers';

export const rootReducer = {
  localize: localizeReducer,
  user,
  therapist,
  notification,
  spinnerOverlay,
  country,
  clinic,
  profession,
  language,
  defaultLimitedPatient,
  auth,
  exercise,
  localization
};

const devTool =
  process.env.NODE_ENV === 'development'
    ? (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()) || compose
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

export default store;
