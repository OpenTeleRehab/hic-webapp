import _ from 'lodash';

export const getIdentity = (id, therapists) => {
  const therapist = _.findLast(therapists, { id: parseInt(id, 10) });

  return therapist ? therapist.identity : '';
};

export const getChatRooms = (id, therapists) => {
  const therapist = _.findLast(therapists, { id: parseInt(id, 10) });

  return therapist ? therapist.chat_rooms : '';
};
