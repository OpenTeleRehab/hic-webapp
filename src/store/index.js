import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  initialize,
  localizeReducer
} from 'react-localize-redux';

import { user } from 'store/user/reducers';
import { notification } from 'store/notification/reducers';
import { spinnerOverlay } from 'store/spinnerOverlay/reducers';
import { language } from 'store/language/reducers';
import { auth } from 'store/auth/reducers';
import { exercise } from 'store/exercise/reducers';
import { localization } from 'store/localization/reducers';
import { termAndCondition } from 'store/termAndCondition/reducers';
import { educationMaterial } from 'store/educationMaterial/reducers';
import { questionnaire } from 'store/questionnaire/reducers';
import { category } from 'store/category/reducers';
import { staticPage } from 'store/staticPage/reducers';
import { privacyPolicy } from 'store/privacyPolicy/reducers';
import { contribute } from 'store/contribute/reducers';

export const rootReducer = {
  localize: localizeReducer,
  user,
  notification,
  spinnerOverlay,
  language,
  auth,
  exercise,
  localization,
  termAndCondition,
  educationMaterial,
  questionnaire,
  category,
  staticPage,
  privacyPolicy,
  contribute
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
