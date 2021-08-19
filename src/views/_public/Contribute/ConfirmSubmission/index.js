import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import * as ROUTES from '../../../../variables/routes';
import { confirmSubmission } from '../../../../store/contributor/actions';
import { replaceRoute } from '../../../../utils/route';

const ConfirmSubmission = () => {
  const dispatch = useDispatch();
  const localize = useSelector((state) => state.localize);
  const { activeLanguage } = useSelector((state) => state.language);
  const translate = getTranslate(localize);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    dispatch(confirmSubmission(new URLSearchParams(location.search).get('hash'))).then(result => {
      if (result) {
        setIsLoading(false);
        setResultTitle(result.title);
        setResultText(result.text);
      }
    });
  }, [dispatch, location]);

  return (
    <>
      {!isLoading &&
        <>
          <div className="main-entry__header text-center">
            <h1>{translate(resultTitle)}</h1>
          </div>

          <div className="main-entry__content">
            <p className="lead text-center">{translate(resultText)}</p>
            <div className="text-center">
              <Link to={replaceRoute(ROUTES.LIBRARY, activeLanguage)} className="btn btn-primary">{translate('contribute.back_to_library')}</Link>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default ConfirmSubmission;
