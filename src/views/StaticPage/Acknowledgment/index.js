import React from 'react';

import PropTypes from 'prop-types';
const Acknowledgment = ({ translate }) => {
  return (
    <>
      <div className="no-gutters bg-white p-md-3">
        This is acknowledgment
      </div>
    </>
  );
};

Acknowledgment.propTypes = {
  translate: PropTypes.func
};

export default Acknowledgment;
