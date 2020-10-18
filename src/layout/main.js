import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from 'variables/routes';

import Login from 'views/Login';
import Home from 'views/Home';
import Dashboard from 'views/Dashboard';

const Main = () => {
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        // Todo: check keycloak authentication and redirect to keycloak login page
        // eslint-disable-next-line
          false ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  };

  PrivateRoute.propTypes = {
    children: PropTypes.func
  };

  return (
    <Switch>
      <Route exact path={ROUTES.LOGIN}>
        <Login />
      </Route>
      <Route exact path={ROUTES.HOME}>
        <Home />
      </Route>
      <PrivateRoute exact path={ROUTES.DASHBOARD}>
        <Dashboard />
      </PrivateRoute>
    </Switch>
  );
};

export default Main;
