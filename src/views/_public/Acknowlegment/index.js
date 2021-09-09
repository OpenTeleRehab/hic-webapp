import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { replaceRoute } from '../../../utils/route';
import * as ROUTES from '../../../variables/routes';
import { useHistory } from 'react-router-dom';
import { getStaticPage } from '../../../store/staticPage/actions';
import { PAGE_TYPES } from 'variables/staticPage';
import ContributorCard from '../../StaticPage/Acknowledgment/contributorCards';
import _ from 'lodash';

const AcknowledgmentPage = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { staticPage } = useSelector(state => state.staticPage);
  const { languages, activeLanguage } = useSelector(state => state.language);
  const [acknowledgment, setAcknowledgment] = useState({});
  const [hideContributors, setHideContributors] = useState([]);

  useEffect(() => {
    const lang = languages.find(language => language.code === activeLanguage);
    dispatch(getStaticPage({
      'url-segment': PAGE_TYPES.ACKNOWLEDGMENT,
      lang: lang && lang.id
    }));
  }, [dispatch, activeLanguage, languages]);

  useEffect(() => {
    if (staticPage) {
      setAcknowledgment(staticPage);
    }
  }, [staticPage]);

  useEffect(() => {
    if (staticPage.acknowledgmentData) {
      setHideContributors(staticPage.acknowledgmentData.hide_contributors);
    }
  }, [staticPage]);

  useEffect(() => {
    history.push(replaceRoute(ROUTES.ACKNOWLEDGMENT, activeLanguage));
  }, [activeLanguage, history]);

  return (
    <>
      {!_.isEmpty(acknowledgment) && (
        <>
          <section className="section__wrapper">
            <Container>
              <ContributorCard hideContributors={hideContributors} />
            </Container>
          </section>
          <section className="section__wrapper bg-white">
            <Container>
              <h2 className="text-primary section__heading">{translate('static_page.partner').toUpperCase()}</h2>
              <div className="p-3 flex-grow-1" dangerouslySetInnerHTML={{ __html: acknowledgment.partner_content }} />
            </Container>
          </section>
        </>
      )}
    </>
  );
};

AcknowledgmentPage.propTypes = {
  translate: PropTypes.func
};

export default AcknowledgmentPage;
