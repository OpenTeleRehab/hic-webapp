import React from 'react';
import { STATUS, STATUS_VARIANTS } from 'variables/resourceStatus';
import { Badge } from 'react-bootstrap';
import { Translate } from 'react-localize-redux';

export const renderStatusBadge = (resource) => {
  if (!resource || !resource.id) {
    return '';
  }

  let status = STATUS.pending;
  if (resource.status === STATUS.rejected) {
    status = STATUS.rejected;
  } else if (resource.status === STATUS.approved) {
    status = STATUS.approved;
  }

  return (
    <Badge pill variant={STATUS_VARIANTS[status]}>
      <Translate id={`common.${status}`} />
    </Badge>
  );
};
