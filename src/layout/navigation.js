import React, { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  withRouter,
  useLocation,
  useHistory
} from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import * as ROUTES from 'variables/routes';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaLanguage } from 'react-icons/fa';
import { setActiveLanguage } from '../store/language/actions';
import { getTranslations } from '../store/translation/actions';
import settings from '../settings';
import { replaceRoute } from '../utils/route';

const Navigation = ({ translate }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { languages, activeLanguage } = useSelector((state) => state.language);
  const [languageName, setLanguageName] = useState('English');

  const publicNavItems = [
    {
      label: 'home',
      to: replaceRoute(ROUTES.HOME, activeLanguage),
      exact: true
    },
    {
      label: 'about_us',
      to: replaceRoute(ROUTES.ABOUT_US, activeLanguage),
      exact: true
    },
    {
      label: 'library',
      to: replaceRoute(ROUTES.LIBRARY, activeLanguage),
      exact: false
    },
    {
      label: 'contribute',
      to: replaceRoute(ROUTES.CONTRIBUTE, activeLanguage),
      exact: true
    },
    {
      label: 'acknowledgment',
      to: replaceRoute(ROUTES.ACKNOWLEDGMENT, activeLanguage),
      exact: true
    },
    {
      label: 'term_condition',
      to: replaceRoute(ROUTES.TERM_CONDITION, activeLanguage),
      exact: true
    }
  ];

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

  let path = '';
  let hash = '';
  const handleLanguageChange = (lang) => {
    dispatch(setActiveLanguage(lang));
    hash = window.location.hash;

    if (window.location.pathname.split('/')[1].length === 2) {
      if (lang === settings.locale) {
        path = location.pathname.replace(/^[\s\S]{0,3}/g, '');
      } else {
        path = location.pathname.replace(/^[\s\S]{0,3}/g, '/' + lang);
      }
    } else {
      path = '/' + lang + location.pathname;
    }

    activeLanguage !== lang && history.push(path + hash);
  };

  useEffect(() => {
    const language = languages.find((language) => language.code === activeLanguage);
    dispatch(getTranslations({ lang: language && language.id, portal: 'public_portal' }));
  }, [activeLanguage, dispatch, languages]);

  return (
    <>
      <Navbar variant="dark" expand="xl" className="top-nav fixed-top">
        { profile !== undefined ? (
          <span className="d-flex nav-link">
            {translate('common.welcome')} {profile.last_name} {profile.first_name},
            &nbsp;
            {translate('back_to_be', {
              link: <NavLink
                to={ROUTES.ADMIN}
              ><strong>{translate('login_here')}</strong></NavLink>
            })}
          </span>
        ) : (
          <span className="d-flex nav-link">
            {translate('login_link', {
              link: <NavLink
                to={ROUTES.ADMIN}
              ><strong>{translate('login_here')}</strong></NavLink>
            })}
          </span>
        )}
      </Navbar>
      <Navbar bg="primary" variant="dark" expand="xl" className="main-nav fix-middle">
        <Navbar.Brand>
          <Link to={replaceRoute(ROUTES.HOME, activeLanguage)}>
            <img
              src="/images/logo.png"
              className="d-inline-block align-top"
              alt={process.env.REACT_APP_SITE_TITLE}
              width="125"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav ml-auto" />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="ml-auto" variant="pills">
            { publicNavItems.map(({ label, to, exact }, key) => {
              return (
                <NavLink
                  to={to}
                  exact={exact}
                  key={key}
                  className="d-flex align-items-center nav-link"
                >
                  {translate(label)}
                </NavLink>
              );
            })
            }
            <Dropdown className="d-flex align-items-center language-wrapper">
              <Dropdown.Toggle variant="link" id="dropdown-basic" className="d-flex align-items-center">
                <FaLanguage size={26} className="mr-1"/><strong className="language-text">{languageName}</strong>
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight={true}>
                {languages.map((language) =>
                  <Dropdown.Item key={language.id} onClick={() => handleLanguageChange(language.code)}>
                    {language.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

Navigation.propTypes = {
  translate: PropTypes.func
};

export default withRouter(Navigation);
