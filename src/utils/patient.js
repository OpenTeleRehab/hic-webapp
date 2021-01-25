import _ from 'lodash';

export const getPatient = (id, patients) => {
  const patient = _.findLast(patients, { therapist_id: parseInt(id, 10) });

  return patient ? 1 : 0;
};
