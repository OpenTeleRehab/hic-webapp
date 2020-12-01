import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const Exersise = ({ translate }) => {
  return (
    <>
      {translate('service_setup.exercises')}
    </>
  );
};

Exersise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exersise);
