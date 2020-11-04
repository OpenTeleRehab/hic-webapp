import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ translate }) => {
  return (
    <>
      {translate('home')}
    </>
  );
};

Home.propTypes = {
  translate: PropTypes.func
};

export default Home;
