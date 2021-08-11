export const STATUS = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export const STATUS_VARIANTS = {
  [STATUS.pending]: 'warning',
  [STATUS.approved]: 'success',
  [STATUS.rejected]: 'danger'
};
