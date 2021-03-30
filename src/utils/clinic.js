import _ from 'lodash';

export const getClinicName = (id, clinics) => {
  const clinic = _.findLast(clinics, { id: parseInt(id, 10) });

  return clinic ? clinic.name : '';
};

export const getClinicIdentity = (id, clinics) => {
  const clinic = _.findLast(clinics, { id: parseInt(id, 10) });

  return clinic ? clinic.identity : '';
};

export const getClinicRegion = (id, clinics) => {
  const clinic = _.findLast(clinics, { id: parseInt(id, 10) });

  return clinic ? clinic.region : '';
};
