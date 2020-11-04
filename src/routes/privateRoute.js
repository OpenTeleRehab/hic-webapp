import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import isAuthenticated from './isAuthenticated';
import * as ROUTES from 'variables/routes';

// if user is authenticated, renders the given component,
// else redirects to the redirectPath

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const redirectPath = {
    pathname: ROUTES.LOGIN,
    state: { from: location }
  };

  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated()
          ? <Component {...props} />
          : <Redirect
            to={redirectPath}
          />;
      }
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object
};

export default PrivateRoute;
