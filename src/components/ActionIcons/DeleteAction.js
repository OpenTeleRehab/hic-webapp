import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';

export const DeleteAction = ({ className, ...rest }) => (
  <OverlayTrigger
    overlay={<Tooltip><Translate id="common.delete" /></Tooltip>}
  >
    <Button variant="link" className={`text-danger p-0 ${className}`} {...rest}>
      <FaTrashAlt size={20} />
    </Button>
  </OverlayTrigger>
);

DeleteAction.propTypes = {
  className: PropTypes.string,
  rest: PropTypes.any
};
