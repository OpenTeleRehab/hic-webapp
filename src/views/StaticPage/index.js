import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { Nav } from 'react-bootstrap';

import HomePage from 'views/StaticPage/Home';
import AboutUs from 'views/StaticPage/AboutUs';
import Acknowledgment from 'views/StaticPage/Acknowledgment';
import TermCondition from 'views/StaticPage/TermCondition';

import * as ROUTES from 'variables/routes';
import { Link, useLocation } from 'react-router-dom';

const VIEW_HOMEPAGE = 'homepage';
const VIEW_ABOUTUS = 'about-us';
const VIEW_TERM_CONDITION = 'term-condition';
const VIEW_ACKNOWLEDGMENT = 'acknowledgment';

const StaticPage = ({ translate }) => {
  const { hash } = useLocation();
  const [view, setView] = useState(undefined);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (hash.includes('#' + VIEW_ABOUTUS)) {
      setView(VIEW_ABOUTUS);
      setTitle(translate('common.about_us'));
    } else if (hash.includes('#' + VIEW_TERM_CONDITION)) {
      setView(VIEW_TERM_CONDITION);
      setTitle(translate('common.term_condition'));
    } else if (hash.includes('#' + VIEW_ACKNOWLEDGMENT)) {
      setView(VIEW_ACKNOWLEDGMENT);
      setTitle(translate('common.acknowledgment'));
    } else {
      setView(VIEW_HOMEPAGE);
      setTitle(translate('common.homepage'));
    }
  }, [hash, translate]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1 className="text-primary">{title}</h1>
      </div>
      <Nav variant="tabs" activeKey={view}>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.ADMIN_STATIC_PAGES} eventKey={VIEW_HOMEPAGE}>
            {translate('common.homepage')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.ADMIN_STATIC_PAGES_ABOUT_US} eventKey={VIEW_ABOUTUS}>
            {translate('common.about_us')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.ADMIN_STATIC_PAGES_TERM_CONDITION} eventKey={VIEW_TERM_CONDITION}>
            {translate('common.term_condition')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={ROUTES.ADMIN_STATIC_PAGES_ACKNOWLEDGMENT} eventKey={VIEW_ACKNOWLEDGMENT}>
            {translate('common.acknowledgment')}
          </Nav.Link>
        </Nav.Item>
      </Nav>
      { view === VIEW_HOMEPAGE && <HomePage /> }
      { view === VIEW_ABOUTUS && < AboutUs /> }
      { view === VIEW_TERM_CONDITION && < TermCondition /> }
      { view === VIEW_ACKNOWLEDGMENT && < Acknowledgment /> }
    </>
  );
};

StaticPage.propTypes = {
  translate: PropTypes.func,
  handleRowEdit: PropTypes.func
};

export default withLocalize(StaticPage);
