import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const CreateEducationMaterial = ({ translate }) => {
  return (
    <>
      {translate('education_material.create')}
    </>
  );
};

CreateEducationMaterial.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(CreateEducationMaterial);
