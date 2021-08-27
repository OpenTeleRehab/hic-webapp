import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const AboutUs = ({ translate }) => {
  return (
    <div className="no-gutters bg-white p-md-3">
      this is AboutUs
    </div>
  );
};

AboutUs.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(AboutUs);
