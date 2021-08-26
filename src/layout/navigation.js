import React, { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import * as ROUTES from 'variables/routes';
import PropTypes from 'prop-types';
import Dialog from 'components/Dialog';
import { useKeycloak } from '@react-keycloak/web';
import { useDispatch, useSelector } from 'react-redux';
import { FaLanguage } from 'react-icons/fa';
import { replaceRoute } from 'utils/route';
import { setActiveLanguage } from '../store/language/actions';
import { getTranslations } from '../store/translation/actions';

const publicNavItems = [
  {
    label: 'home',
    to: ROUTES.HOME,
    exact: true
  },
  {
    label: 'library',
    to: ROUTES.LIBRARY,
    exact: false
  },
  {
    label: 'contribute',
    to: ROUTES.CONTRIBUTE,
    exact: true
  }
];

const Navigation = ({ translate }) => {
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { profile } = useSelector((state) => state.auth);
  const { languages, activeLanguage } = useSelector((state) => state.language);
  const [languageName, setLanguageName] = useState('English');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    if (keycloak.authenticated) {
      keycloak.logout();
    }
  };

  useEffect(() => {
    if (window.location.pathname.split('/')[1].length === 2) {
      dispatch(setActiveLanguage(window.location.pathname.split('/')[1]));
    }
  }, [dispatch]);

  useEffect(() => {
    const language = languages.find((language) => language.code === activeLanguage);
    if (language) {
      setLanguageName(language.name);
    }
  }, [activeLanguage, languages]);

  const handleLanguageChange = (lang) => {
    dispatch(setActiveLanguage(lang));
  };

  useEffect(() => {
    const language = languages.find((language) => language.code === activeLanguage);
    dispatch(getTranslations({ lang: language && language.id, portal: 'public_portal' }));
  }, [activeLanguage, dispatch, languages]);

  return (
    <Navbar bg="primary" variant="dark" expand="xl" sticky="top" className="main-nav">
      <Navbar.Brand>
        <Link to={replaceRoute(ROUTES.HOME, activeLanguage)}>
          <img
            src="/images/logo.png"
            className="d-inline-block align-top"
            alt="OpenTeleRehap logo"
            width="125"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav ml-auto" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" variant="pills">
          {
            !keycloak.authenticated && publicNavItems.map(({ label, to, exact }, key) => {
              return (
                <NavLink
                  to={replaceRoute(to, activeLanguage)}
                  exact={exact}
                  key={key}
                  className="d-flex align-items-center nav-link"
                >
                  {translate(label)}
                </NavLink>
              );
            })
          }

          { profile !== undefined ? (
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                {translate('common.welcome')} {profile.last_name} {profile.first_name}
                <br/>
                {profile.email}
              </Dropdown.Toggle>

              <Dropdown.Menu
                alignRight={true}
              >
                <Dropdown.Item as={Link} to={ROUTES.PROFILE}>
                  {translate('common.profile.update')}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShow}>{translate('common.logout')}</Dropdown.Item>
                <Dialog
                  show={show}
                  title={translate('logout.confirmation')}
                  cancelLabel={translate('logout.cancel')}
                  onCancel={handleClose}
                  confirmLabel={translate('logout.confirm')}
                  onConfirm={handleConfirm}
                >
                  <p>{translate('logout.message')}</p>
                </Dialog>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown className="d-flex align-items-center language-wrapper">
              <Dropdown.Toggle variant="link" id="dropdown-basic" className="d-flex align-items-center">
                <FaLanguage size={26} className="mr-1"/><strong className="language-text">{languageName}</strong>
              </Dropdown.Toggle>
              <Dropdown.Menu
                alignRight={true}
              >
                {languages.map((language) =>
                  <Dropdown.Item key={language.id} onClick={() => handleLanguageChange(language.code)}>
                    {language.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  translate: PropTypes.func
};

export default withRouter(Navigation);
