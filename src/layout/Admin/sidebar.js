import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { BsHouse, BsLayers, BsGrid } from 'react-icons/bs';
import { MdGTranslate } from 'react-icons/md';
import { BiFolder } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';

import * as ROUTES from '../../variables/routes';
import keycloak from '../../utils/keycloak';
import { USER_ROLES } from '../../variables/user';

const sidebarNavItems = [
  {
    label: 'dashboard',
    to: ROUTES.ADMIN_DASHBOARD,
    icon: <AiOutlineDashboard />,
    exact: true
  },
  {
    label: 'resources',
    to: ROUTES.ADMIN_RESOURCES,
    icon: <BsLayers />,
    exact: false,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    label: 'categories',
    to: ROUTES.ADMIN_CATEGORIES,
    icon: <BsGrid />,
    exact: true,
    roles: [USER_ROLES.SETUP_CATEGORY]
  },
  {
    label: 'translations',
    to: ROUTES.ADMIN_TRANSLATIONS,
    icon: <MdGTranslate />,
    exact: true,
    roles: [USER_ROLES.MANAGE_TRANSLATION]
  },
  {
    label: 'users',
    to: ROUTES.ADMIN_USERS,
    icon: <FiUser />,
    exact: true,
    roles: [USER_ROLES.MANAGE_USER]
  },
  {
    label: 'static_pages',
    to: ROUTES.ADMIN_STATIC_PAGES,
    icon: <BiFolder />,
    exact: true,
    roles: [USER_ROLES.MANAGE_STATIC_PAGE]
  },
  {
    label: 'frontend',
    to: ROUTES.HOME,
    icon: <BsHouse />,
    exact: true
  }
];

const Sidebar = () => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);

  return (
    <>
      <Navbar className="aside align-items-start fixed-l" bg="white">
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="flex-column">
            {
              sidebarNavItems.map(({ label, to, icon, exact, roles }, key) => {
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
                    {icon} <span className="menu-text">{translate(label)}</span>
                  </NavLink>
                );
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Sidebar;
