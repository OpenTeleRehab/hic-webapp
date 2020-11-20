import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import PageLayout from 'layout/layout';
import PrivateRoute from 'routes/privateRoute';
import DashboardPage from 'views/Dashboard';
import NotFoundPage from 'views/NotFound';
import AdminPage from 'views/Admin';
import CategoryPage from 'views/Category';
import ServiceSetupPage from 'views/ServiceSetup';
import Therapist from 'views/Therapist';
import ProfilePage from 'views/Profile';

import * as ROUTES from 'variables/routes';
const PRIVATE = 'private';
const PUBLIC = 'public';

const routes = [
  {
    title: 'dashboard',
    path: ROUTES.DASHBOARD,
    component: DashboardPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'admin',
    path: ROUTES.ADMIN,
    component: AdminPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'therapist',
    path: ROUTES.THERAPIST,
    component: Therapist,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'service_setup',
    path: ROUTES.SERVICE_SETUP,
    component: ServiceSetupPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'category',
    path: ROUTES.CATEGORY,
    component: CategoryPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'profile',
    path: ROUTES.PROFILE,
    component: ProfilePage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'avatar',
    path: ROUTES.AVATAR,
    component: ProfilePage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'not_found_page',
    path: '*',
    component: NotFoundPage,
    type: PUBLIC
  }
];

const RouteSwitch = () => {
  const routeComponents = routes.map(({ path, component, exact, type, title }, key) => {
    return type === PUBLIC ? (
      <Route exact={!!exact} path={path} key={key}>
        <PageLayout component={component} title={title} />
      </Route>
    ) : (
      <PrivateRoute exact={!!exact} path={path} key={key}>
        <PageLayout component={component} title={title} />
      </PrivateRoute>
    );
  });

  return (
    <Suspense fallback={<Spinner animation="border" />}>
      <Switch>
        {routeComponents}
      </Switch>
    </Suspense>
  );
};

export default RouteSwitch;
