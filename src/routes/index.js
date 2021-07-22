import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import PageLayout from 'layout/layout';
import PrivateRoute from 'routes/privateRoute';

import PublicDashboardPage from 'views/_public/Dashboard';
import LibraryPage from 'views/_public/Library';

import DashboardPage from 'views/Dashboard';
import NotFoundPage from 'views/NotFound';
import AdminPage from 'views/Admin';
import CategoryPage from 'views/Category';
import Setting from 'views/Setting';
import ServiceSetupPage from 'views/ServiceSetup';
import CreateExercise from 'views/ServiceSetup/Exercise/create';
import CreateEducationMaterial from 'views/ServiceSetup/EducationMaterial/create';
import CreateQuestionnaire from 'views/ServiceSetup/Questionnaire/create';
import ProfilePage from 'views/Profile';
import FaqPage from 'views/Faq';
import TermConditionPage from 'views/TermCondition';
import PrivacyPolicyPage from 'views/PrivacyPolicy';

import * as ROUTES from 'variables/routes';
import { USER_ROLES, SETTING_ROLES } from 'variables/user';
const PRIVATE = 'private';
const PUBLIC = 'public';

const publicRoutes = [
  {
    title: 'dashboard',
    path: ROUTES.DASHBOARD,
    component: PublicDashboardPage,
    exact: true,
    type: PUBLIC
  },
  {
    title: 'dashboard',
    path: ROUTES.LIBRARY,
    component: LibraryPage,
    exact: true,
    type: PUBLIC
  }
];

const routes = [
  ...publicRoutes,
  {
    title: 'dashboard',
    path: ROUTES.ADMIN_DASHBOARD,
    component: DashboardPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'admin',
    path: ROUTES.ADMIN,
    component: AdminPage,
    exact: true,
    type: PRIVATE,
    roles: [
      USER_ROLES.MANAGE_GLOBAL_ADMIN,
      USER_ROLES.MANAGE_COUNTRY_ADMIN,
      USER_ROLES.MANAGE_CLINIC_ADMIN
    ]
  },
  {
    title: 'service_setup',
    path: ROUTES.SERVICE_SETUP,
    component: ServiceSetupPage,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_EXERCISE]
  },
  {
    title: 'exercise.create',
    path: ROUTES.EXERCISE_CREATE,
    component: CreateExercise,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_EXERCISE]
  },
  {
    title: 'exercise.edit',
    path: ROUTES.EXERCISE_EDIT,
    component: CreateExercise,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_EXERCISE]
  },
  {
    title: 'education_material.create',
    path: ROUTES.EDUCATION_MATERIAL_CREATE,
    component: CreateEducationMaterial,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_EDUCATIONAL_MATERIAL]
  },
  {
    title: 'education_material.edit',
    path: ROUTES.EDUCATION_MATERIAL_EDIT,
    component: CreateEducationMaterial,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_EDUCATIONAL_MATERIAL]
  },
  {
    title: 'questionnaire.create',
    path: ROUTES.QUESTIONNAIRE_CREATE,
    component: CreateQuestionnaire,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_QUESTIONNAIRE]
  },
  {
    title: 'questionnaire.edit',
    path: ROUTES.QUESTIONNAIRE_EDIT,
    component: CreateQuestionnaire,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_QUESTIONNAIRE]
  },
  {
    title: 'category',
    path: ROUTES.CATEGORY,
    component: CategoryPage,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_CATEGORY]
  },
  {
    title: 'setting',
    path: ROUTES.SETTING,
    component: Setting,
    exact: true,
    type: PRIVATE,
    roles: SETTING_ROLES
  },
  {
    title: 'profile',
    path: ROUTES.PROFILE,
    component: ProfilePage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'faq',
    path: ROUTES.FAQ,
    component: FaqPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'term-condition',
    path: ROUTES.TC,
    component: TermConditionPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'privacy-policy',
    path: ROUTES.PP,
    component: PrivacyPolicyPage,
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
  const routeComponents = routes.map(({ path, component, exact, type, title, roles }, key) => {
    return type === PUBLIC ? (
      <Route exact={!!exact} path={path} key={key}>
        <PageLayout component={component} title={title} />
      </Route>
    ) : (
      <PrivateRoute exact={!!exact} path={path} key={key} roles={roles}>
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
