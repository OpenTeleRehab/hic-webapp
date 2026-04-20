import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Translate } from 'react-localize-redux';
import { IoKey } from 'react-icons/io5';
import PropTypes from 'prop-types';

export const ResetUserOTPAction = ({ className, ...rest }) => (
  <OverlayTrigger
    overlay={<Tooltip><Translate id="common.reset_user_otp" /></Tooltip>}
  >
    <Button aria-label="Reset User OTP" variant="link" className={`p-0 ${className}`} {...rest}>
      <IoKey size={25} />
    </Button>
  </OverlayTrigger>
);

ResetUserOTPAction.propTypes = {
  className: PropTypes.string,
  rest: PropTypes.any
};
