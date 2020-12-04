import _ from 'lodash';

export const getCountryName = (id, countries) => {
  const country = _.findLast(countries, { id: parseInt(id, 10) });

  return country ? country.name : '';
};
export const getCountryIdentity = (id, countries) => {
  const country = _.findLast(countries, { id: parseInt(id, 10) });

  return country ? country.identity : '';
};
