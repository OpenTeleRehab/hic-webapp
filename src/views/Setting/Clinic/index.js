import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const Clinic = ({ translate }) => {
  return (
    <>
      {translate('setting.clinics')}
    </>
  );
};

Clinic.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Clinic);
