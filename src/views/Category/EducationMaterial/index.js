import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const EducationMaterial = ({ translate }) => {
  return (
    <>
      {translate('material')}
    </>
  );
};

EducationMaterial.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(EducationMaterial);
