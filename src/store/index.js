import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  addTranslationForLanguage,
  initialize,
  localizeReducer
} from 'react-localize-redux';

import { user } from 'store/user/reducer';
import en from 'translations/en.locale.json';

export const rootReducer = {
  localize: localizeReducer,
  user
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
const onMissingTranslation = ({ defaultTranslation }) => defaultTranslation;

store.dispatch(initialize({
  languages,
  options: {
    defaultLanguage,
    renderToStaticMarkup,
    onMissingTranslation
  }
}));

store.dispatch(addTranslationForLanguage(en, 'en'));

export default store;
