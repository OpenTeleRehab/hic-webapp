export const STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  EXPIRED: 'expired'
};

export const STATUS_VARIANTS = {
  [STATUSES.DRAFT]: 'warning',
  [STATUSES.PUBLISHED]: 'success',
  [STATUSES.EXPIRED]: 'danger'
};
