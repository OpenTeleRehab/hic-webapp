import React, { useEffect, useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import * as ROUTES from 'variables/routes';
import PropTypes from 'prop-types';
import Dialog from 'components/Dialog';
import { useKeycloak } from '@react-keycloak/web';
import { useSelector } from 'react-redux';
import { BsChevronDoubleLeft } from 'react-icons/bs';

const navItems = [];

const Navigation = ({ translate }) => {
  const { keycloak } = useKeycloak();
  const [show, setShow] = useState(false);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (window.innerWidth < 1200) {
      document.body.classList.add('aside-minimize');
    } else {
      document.body.classList.remove('aside-minimize');
    }

    const handleResize = () => {
      if (window.innerWidth < 1200) {
        document.body.classList.add('aside-minimize');
      } else {
        document.body.classList.remove('aside-minimize');
      }
    };
    window.addEventListener('resize', handleResize);
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    if (keycloak.authenticated) {
      keycloak.logout();
    }
  };

  const handleMinimizeAside = () => {
    if (document.body.classList.contains('aside-minimize')) {
      document.body.classList.remove('aside-minimize');
    } else {
      document.body.classList.add('aside-minimize');
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="xl" className="main-nav fixed-top">
      <Navbar.Brand className="d-flex justify-content-between">
        <Link to={ROUTES.HOME} className="logo">
          <img
            src="/images/logo.png"
            className="img-fluid logo-maximize"
            alt="OpenTeleRehap"
          />
          <img
            src="/images/logo-minimize.png"
            className="img-fluid logo-minimize"
            alt="OpenTeleRehap"
          />
        </Link>

        <Button
          className="brand-toggle"
          variant="link"
          onClick={handleMinimizeAside}
        >
          <BsChevronDoubleLeft />
        </Button>
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

          { profile !== undefined && (
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
