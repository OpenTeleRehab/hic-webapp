import React, { useState, useEffect } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from 'variables/routes';
import Exercise from './Exercise';
import EducationMaterial from './EducationMaterial';
import Questionnaire from './Questionnaire';
import { BsPlus } from 'react-icons/bs';

const VIEW_EXERCISE = 'exercise';
const VIEW_EDUCATION = 'education';
const VIEW_QUESTIONNAIRE = 'questionnaire';

const ServiceSetup = ({ translate }) => {
  const { hash } = useLocation();
  const [view, setView] = useState(VIEW_EXERCISE);

  useEffect(() => {
    if (hash.includes('#education')) {
      setView(VIEW_EDUCATION);
    } else if (hash.includes('#questionnaire')) {
      setView(VIEW_QUESTIONNAIRE);
    } else {
      setView(VIEW_EXERCISE);
    }
  }, [hash]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('service_setup')}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Dropdown>
            <Dropdown.Toggle>
              <BsPlus size={20} className="mr-1" />
              {translate('common.new_content')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={ROUTES.EXERCISE_CREATE}>{translate('exercise.new')}</Dropdown.Item>
              <Dropdown.Item as={Link} to={ROUTES.EDUCATION_MATERIAL_CREATE}>{translate('education_material.new')}</Dropdown.Item>
              <Dropdown.Item as={Link} to={ROUTES.QUESTIONNAIRE_CREATE}>{translate('questionnaire.new')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Nav variant="tabs" activeKey={view} className="mb-3">
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.SERVICE_SETUP} eventKey={VIEW_EXERCISE}>
            {translate('service_setup.exercises')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.SERVICE_SETUP_EDUCATION} eventKey={VIEW_EDUCATION}>
            {translate('service_setup.education_materials')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.SERVICE_SETUP_QUESTIONNAIRE} eventKey={VIEW_QUESTIONNAIRE}>
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

ServiceSetup.propTypes = {
  translate: PropTypes.func
};

export default ServiceSetup;
