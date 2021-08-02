export const STATUS = {
  pending: 'pending',
  approved: 'approved',
  declined: 'declined'
};

export const STATUS_VARIANTS = {
  [STATUS.pending]: 'warning',
  [STATUS.approved]: 'success',
  [STATUS.declined]: 'danger'
};
