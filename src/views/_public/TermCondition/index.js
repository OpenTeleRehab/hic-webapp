import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPublishTermCondition,
  getTermConditionBanner
} from 'store/termAndCondition/actions';

import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { replaceRoute } from '../../../utils/route';
import * as ROUTES from '../../../variables/routes';
import { useHistory } from 'react-router-dom';

const TermConditionPage = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { publishTermAndConditionPage } = useSelector(state => state.termAndCondition);
  const { languages, activeLanguage } = useSelector(state => state.language);
  const [termCondition, setTermCondition] = useState({});

  useEffect(() => {
    const lang = languages.find(language => language.code === activeLanguage);
    dispatch(getPublishTermCondition(lang && lang.id));
  }, [dispatch, activeLanguage, languages]);

  useEffect(() => {
    dispatch(getTermConditionBanner());
  }, [dispatch]);

  useEffect(() => {
    if (publishTermAndConditionPage) {
      setTermCondition(publishTermAndConditionPage);
    }
  }, [publishTermAndConditionPage]);

  useEffect(() => {
    history.push(replaceRoute(ROUTES.TERM_CONDITION, activeLanguage));
  }, [activeLanguage, history]);

  return (
    <>
      <section className="section__wrapper">
        <Container>
          <div className="p-3 flex-grow-1" dangerouslySetInnerHTML={{ __html: termCondition.content }} />
        </Container>
      </section>
    </>
  );
};

TermConditionPage.propTypes = {
  translate: PropTypes.func
};

export default TermConditionPage;
