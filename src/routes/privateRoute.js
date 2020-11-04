import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import isAuthenticated from './isAuthenticated';
import * as ROUTES from 'variables/routes';

const PrivateRoute = ({ children, title, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated()
          ? children
          : <Redirect to={{
            pathname: ROUTES.LOGIN,
            state: { from: props.location }
          }} />;
      }
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  location: PropTypes.object,
  title: PropTypes.string
};

export default PrivateRoute;
