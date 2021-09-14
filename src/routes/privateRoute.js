import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';

import * as ROUTES from 'variables/routes';

const PrivateRoute = ({ children, title, roles, ...rest }) => {
  const { keycloak } = useKeycloak();

  return (
    <Route
      {...rest}
      render={() => {
        if (keycloak.authenticated === false) {
          keycloak.login();
          return;
        }

        if (roles) {
          const role = roles.find(role => {
            return keycloak.hasRealmRole(role);
          });

          if (!role) {
            return <Redirect to={ROUTES.ADMIN_DASHBOARD} />;
          }
        }

        return children;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  location: PropTypes.object,
  title: PropTypes.string,
  roles: PropTypes.array
};

export default PrivateRoute;
