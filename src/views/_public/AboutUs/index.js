import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { replaceRoute } from '../../../utils/route';
import * as ROUTES from '../../../variables/routes';
import { useHistory } from 'react-router-dom';
import { getStaticPage } from '../../../store/staticPage/actions';
import { PAGE_TYPES } from '../../../variables/staticPage';

const AboutUsPage = ({ translate }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { staticPage } = useSelector(state => state.staticPage);
  const { languages, activeLanguage } = useSelector(state => state.language);
  const [aboutUs, setAboutUs] = useState({});

  useEffect(() => {
    const lang = languages.find(language => language.code === activeLanguage);
    dispatch(getStaticPage({
      'url-segment': PAGE_TYPES.ABOUT_US,
      lang: lang && lang.id
    }));
  }, [dispatch, activeLanguage, languages]);

  useEffect(() => {
    if (staticPage) {
      setAboutUs(staticPage);
    }
  }, [staticPage]);

  useEffect(() => {
    history.push(replaceRoute(ROUTES.ABOUT_US, activeLanguage));
  }, [activeLanguage, history]);

  return (
    <>
      <section className="section__wrapper">
        <Container>
          <div className="p-3 flex-grow-1" dangerouslySetInnerHTML={{ __html: aboutUs.content }} />
        </Container>
      </section>
      <section className="section__wrapper bg-white">
        <Container>
          <h2 className="text-primary section__heading">{translate('static_page.partner').toUpperCase()}</h2>
          <div className="p-3 flex-grow-1" dangerouslySetInnerHTML={{ __html: aboutUs.partner_content }} />
        </Container>
      </section>
    </>
  );
};

AboutUsPage.propTypes = {
  translate: PropTypes.func
};

export default AboutUsPage;
