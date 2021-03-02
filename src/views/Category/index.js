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

const Category = ({ translate }) => {
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('category')}</h1>
      </div>

      <Nav variant="tabs" activeKey={view} className="mb-3">
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.CATEGORY} eventKey={VIEW_EXERCISE}>
            {translate('service_setup.exercises')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.CATEGORY_EDUCATION} eventKey={VIEW_EDUCATION}>
            {translate('service_setup.education_materials')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.CATEGORY_QUESTIONNAIRE} eventKey={VIEW_QUESTIONNAIRE}>
            {translate('service_setup.questionnaires')}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      { view === VIEW_EXERCISE && <Exercise /> }
      { view === VIEW_EDUCATION && <EducationMaterial /> }
      { view === VIEW_QUESTIONNAIRE && <Questionnaire /> }
    </>
  );
};

Category.propTypes = {
  translate: PropTypes.func
};

export default Category;
