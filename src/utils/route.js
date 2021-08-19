
export const replaceRoute = (route, lang) => {
  let newRoute = '';
  if (lang === 'en') {
    newRoute = route.replace(':lang?/', '');
  } else {
    newRoute = route === '/:lang?/' ? route.replace(':lang?/', lang) : route.replace(':lang?', lang);
  }
  return newRoute;
};
