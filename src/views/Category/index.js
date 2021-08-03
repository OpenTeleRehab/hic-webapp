import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from 'variables/routes';
import CategoryList from './_Partials/CategoryList';

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
        <h1 className="text-primary">{translate('categories')}</h1>
      </div>

      <Nav variant="tabs" activeKey={view}>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.ADMIN_CATEGORIES} eventKey={VIEW_EXERCISE}>
            {translate('category.exercises')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.ADMIN_CATEGORY_EDUCATION} eventKey={VIEW_EDUCATION}>
            {translate('category.education_materials')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.ADMIN_CATEGORY_QUESTIONNAIRE} eventKey={VIEW_QUESTIONNAIRE}>
            {translate('category.questionnaires')}
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CategoryList type={view} />
    </>
  );
};

Category.propTypes = {
  translate: PropTypes.func
};

export default Category;
