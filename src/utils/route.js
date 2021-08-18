
export const replaceRoute = (route, lang) => {
  const newRoute = route === '/:lang?/' ? route.replace(':lang?/', lang) : route.replace(':lang?', lang);
  return newRoute;
};
