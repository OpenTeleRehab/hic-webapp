import React from 'react';
import { getTranslate } from 'react-localize-redux';
import { useSelector } from 'react-redux';

const NotFound = () => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  return (
    <div className="d-flex flex-column align-items-center text-center">
      <h6>{translate('common.oops')}</h6>
      <h1 className="fs-1">{translate('common.404.title')}</h1>
      <p>{translate('common.404.description')}</p>
    </div>
  );
};

export default NotFound;
