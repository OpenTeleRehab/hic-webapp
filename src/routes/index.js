import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import PrivateRoute from 'routes/privateRoute';

import HomePage from 'views/Home';
import LoginPage from 'views/Login';
import DashboardPage from 'views/Dashboard';
import NotFoundPage from 'views/NotFound';

import * as ROUTES from 'variables/routes';
const PRIVATE = 'private';
const PUBLIC = 'public';

const routes = [
  {
    path: ROUTES.HOME,
    component: HomePage,
    exact: true,
    type: PUBLIC
  },
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
    exact: true,
    type: PUBLIC
  },
  {
    path: ROUTES.DASHBOARD,
    component: DashboardPage,
    exact: true,
    type: PRIVATE
  },
  {
    path: '*',
    component: NotFoundPage,
    type: PUBLIC
  }
];

const RouteComponent = () => {
  const routeComponents = routes.map(({ path, component, exact, type }, key) => {
    if (type === PUBLIC) {
      return <Route exact={!!exact} path={path} component={component} key={key} />;
    } else {
      return <PrivateRoute exact={!!exact} path={path} component={component} key={key} />;
    }
  });

  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <Switch>
        {routeComponents}
      </Switch>
    </Suspense>
  );
};

export default RouteComponent;
