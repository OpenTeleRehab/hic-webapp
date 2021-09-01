import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

export const ToggleOffAction = ({ className, ...rest }) => (
  <OverlayTrigger
    overlay={<Tooltip><Translate id="common.on" /></Tooltip>}
  >
    <Button variant="link" className={`text-success p-0 ${className}`} {...rest}>
      <FaToggleOff size={20} />
    </Button>
  </OverlayTrigger>
);

ToggleOffAction.propTypes = {
  className: PropTypes.string,
  rest: PropTypes.any
};

export const ToggleOnAction = ({ className, ...rest }) => (
  <OverlayTrigger
    overlay={<Tooltip><Translate id="common.off" /></Tooltip>}
  >
    <Button variant="link" className={`text-success p-0 ${className}`} {...rest}>
      <FaToggleOn size={20} />
    </Button>
  </OverlayTrigger>
);

ToggleOnAction.propTypes = {
  className: PropTypes.string,
  rest: PropTypes.any
};
