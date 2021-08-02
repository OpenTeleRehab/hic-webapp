import _ from 'lodash';

export const getContributorName = (id, contributors) => {
  const contributor = _.findLast(contributors, { id: parseInt(id, 10) });

  return contributor ? contributor.name : '';
};
