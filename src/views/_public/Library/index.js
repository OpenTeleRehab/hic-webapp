import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from 'variables/routes';
import Exercise from './Exercise';
import EducationMaterial from './EducationMaterial';
import Questionnaire from './Questionnaire';
import { useSelector } from 'react-redux';
import { replaceRoute } from '../../../utils/route';

const VIEW_EXERCISE = 'exercise';
const VIEW_EDUCATION = 'education';
const VIEW_QUESTIONNAIRE = 'questionnaire';

const Library = ({ translate }) => {
  const { hash } = useLocation();
  const { languages, activeLanguage } = useSelector((state) => state.language);
  const [view, setView] = useState(undefined);
  const [lang, setLang] = useState('');

  useEffect(() => {
    const lang = languages.find((language) => language.code === activeLanguage);
    if (lang) {
      setLang(lang.id);
    }
  }, [languages, activeLanguage]);

  useEffect(() => {
    if (hash.includes('#' + VIEW_EDUCATION)) {
      setView(VIEW_EDUCATION);
    } else if (hash.includes('#' + VIEW_QUESTIONNAIRE)) {
      setView(VIEW_QUESTIONNAIRE);
    } else {
      setView(VIEW_EXERCISE);
    }
  }, [hash]);

  return (
    <>
      <h1 className="d-none">{translate('library')}</h1>
      <Nav variant="tabs" activeKey={view} className="mb-3">
        <Nav.Item>
          <Nav.Link as={Link} to={replaceRoute(ROUTES.LIBRARY, activeLanguage)} eventKey={VIEW_EXERCISE}>
            {translate('library.exercises')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={replaceRoute(ROUTES.LIBRARY_EDUCATION, activeLanguage)} eventKey={VIEW_EDUCATION}>
            {translate('library.education_materials')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={replaceRoute(ROUTES.LIBRARY_QUESTIONNAIRE, activeLanguage)} eventKey={VIEW_QUESTIONNAIRE}>
            {translate('library.questionnaires')}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      { view === VIEW_EXERCISE && <Exercise lang={lang}/> }
      { view === VIEW_EDUCATION && <EducationMaterial lang={lang} /> }
      { view === VIEW_QUESTIONNAIRE && <Questionnaire lang={lang}/> }
    </>
  );
};

Library.propTypes = {
  translate: PropTypes.func
};

export default Library;
