import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const SystemLimit = ({ translate }) => {
  return (
    <>
      {translate('setting.translations')}
    </>
  );
};

SystemLimit.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(SystemLimit);
