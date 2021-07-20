import React, { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import * as ROUTES from 'variables/routes';
import PropTypes from 'prop-types';
import Dialog from 'components/Dialog';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';

import { USER_ROLES, SETTING_ROLES } from 'variables/user';

const publicNavItems = [
  {
    label: 'dashboard',
    to: ROUTES.DASHBOARD,
    exact: true
  },
  {
    label: 'library',
    to: ROUTES.LIBRARY,
    exact: true
  }
];

const navItems = [
  {
    label: 'dashboard',
    to: ROUTES.ADMIN_DASHBOARD,
    exact: true,
    roles: [USER_ROLES.MANAGE_GLOBAL_ADMIN]
  },
  {
    label: 'service_setup',
    to: ROUTES.SERVICE_SETUP,
    exact: false,
    roles: [USER_ROLES.MANAGE_GLOBAL_ADMIN]
  },
  {
    label: 'category',
    to: ROUTES.CATEGORY,
    exact: true,
    roles: [USER_ROLES.SETUP_CATEGORY]
  },
  {
    label: 'admin',
    to: ROUTES.ADMIN,
    exact: true,
    roles: [
      USER_ROLES.MANAGE_GLOBAL_ADMIN,
      USER_ROLES.MANAGE_COUNTRY_ADMIN,
      USER_ROLES.MANAGE_CLINIC_ADMIN
    ]
  },
  {
    label: 'setting',
    to: ROUTES.SETTING,
    exact: true,
    roles: SETTING_ROLES
  }
];

const Navigation = ({ translate }) => {
  const { keycloak } = useKeycloak();
  const [show, setShow] = useState(false);
  const { profile } = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    if (keycloak.authenticated) {
      keycloak.logout();
    }
  };
  const handleShowRole = (role) => {
    return translate(`common.${role}`);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="xl" sticky="top" className="main-nav">
      <Navbar.Brand>
        <Link to={ROUTES.DASHBOARD}>
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
            navItems.map(({ label, to, exact, roles }, key) => {
              if (roles) {
                const role = roles.find(role => {
                  return keycloak.hasRealmRole(role);
                });

                if (!role) {
                  return null;
                }
              }

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

          {
            !keycloak.authenticated && publicNavItems.map(({ label, to, exact }, key) => {
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

          { profile !== undefined && (
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                {translate('common.welcome')} {profile.last_name} {profile.first_name}
                <br/>
                {handleShowRole(profile.type)}
              </Dropdown.Toggle>

              <Dropdown.Menu
                alignRight={true}
              >
                <Dropdown.Item as={Link} to={ROUTES.PROFILE}>
                  {translate('profile.setting')}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={ROUTES.FAQ}>
                  {translate('profile.faq')}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={ROUTES.TC}>
                  {translate('profile.tc')}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={ROUTES.PP}>
                  {translate('profile.pp')}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShow}>{translate('logout')}</Dropdown.Item>
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
