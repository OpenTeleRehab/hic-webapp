import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const profession = ({ translate }) => {
  return (
    <>
      {translate('setting.professions')}
    </>
  );
};

profession.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(profession);
