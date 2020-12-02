import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const Exercise = ({ translate }) => {
  return (
    <>
      {translate('service_setup.exercises')}
    </>
  );
};

Exercise.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Exercise);
