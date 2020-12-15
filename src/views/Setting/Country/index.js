import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const Country = ({ translate }) => {
  return (
    <>
      {translate('setting.countries')}
    </>
  );
};

Country.propTypes = {
  translate: PropTypes.func
};

export default withLocalize(Country);
