import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from 'variables/routes';
import Exercise from './Exercise';
import EducationMaterial from './EducationMaterial';
import Questionnaire from './Questionnaire';

const VIEW_EXERCISE = 'exercise';
const VIEW_EDUCATION = 'education';
const VIEW_QUESTIONNAIRE = 'questionnaire';

const Library = ({ translate }) => {
  const { hash } = useLocation();
  const [view, setView] = useState(undefined);

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
      <Nav variant="tabs" activeKey={view} className="mb-3">
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.LIBRARY} eventKey={VIEW_EXERCISE}>
            {translate('library.exercises')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.LIBRARY_EDUCATION} eventKey={VIEW_EDUCATION}>
            {translate('library.education_materials')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.LIBRARY_QUESTIONNAIRE} eventKey={VIEW_QUESTIONNAIRE}>
            {translate('library.questionnaires')}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      { view === VIEW_EXERCISE && <Exercise /> }
      { view === VIEW_EDUCATION && <EducationMaterial /> }
      { view === VIEW_QUESTIONNAIRE && <Questionnaire /> }
    </>
  );
};

Library.propTypes = {
  translate: PropTypes.func
};

export default Library;
