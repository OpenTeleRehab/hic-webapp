import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';

const HomePage = ({ translate }) => {
  return (
    <div className="no-gutters bg-white p-md-3">
      this is homepage
    </div>
  );
};

HomePage.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(HomePage);
