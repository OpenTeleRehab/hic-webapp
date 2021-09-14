import settings from '../settings';

export const replaceRoute = (route, lang) => {
  return lang === settings.locale ? route : '/' + lang + route;
};
