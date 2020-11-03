import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import * as ROUTES from 'variables/routes';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand>
        <Link to={ROUTES.HOME}>
          <img
            src="/images/logo.png"
            className="d-inline-block align-top"
            alt="Handicap International logo"
          />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            exact
            to={ROUTES.HOME}
            key='nav-home'
            className="nav-link"
          >
            Home
          </NavLink>
          <NavLink
            exact
            to={ROUTES.DASHBOARD}
            key='nav-dashboard'
            className="nav-link"
          >
            Dashboard
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
