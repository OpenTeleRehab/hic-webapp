import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPublishTermCondition } from 'store/termAndCondition/actions';

import PropTypes from 'prop-types';
const TermConditionPage = ({ translate }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublishTermCondition());
  }, [dispatch]);

  return (
    <>
      <div className="no-gutters bg-white p-md-3">
        This is term and condition
      </div>
    </>
  );
};

TermConditionPage.propTypes = {
  translate: PropTypes.func
};

export default TermConditionPage;
