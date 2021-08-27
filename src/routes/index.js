import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import DefaultLayout from 'layout/layout';
import AdminLayout from 'layout/Admin/layout';
import PrivateRoute from 'routes/privateRoute';

import PublicHomePage from 'views/_public';
import LibraryPage from 'views/_public/Library';
import ContributePage from 'views/_public/Contribute';
import ConfirmSubmissionPage from 'views/_public/Contribute/ConfirmSubmission';
import ExerciseDetail from 'views/_public/Library/Exercise/detail';
import EducationMaterialDetail from 'views/_public/Library/EducationMaterial/detail';
import QuestionnaireDetail from 'views/_public/Library/Questionnaire/detail';

import DashboardPage from 'views/Dashboard';
import ServiceSetupPage from 'views/ServiceSetup';
import NotFoundPage from 'views/NotFound';
import CategoryPage from 'views/Category';
import Translation from 'views/Translation';
import Language from 'views/Translation/Language';
import CreateExercise from 'views/ServiceSetup/Exercise/create';
import CreateEducationMaterial from 'views/ServiceSetup/EducationMaterial/create';
import CreateQuestionnaire from 'views/ServiceSetup/Questionnaire/create';
import ProfilePage from 'views/Profile';
import FaqPage from 'views/Faq';
import TermConditionPage from 'views/StaticPage/TermCondition';
import PrivacyPolicyPage from 'views/PrivacyPolicy';
import UserPage from 'views/User';
import StaticPage from 'views/StaticPage';

import * as ROUTES from 'variables/routes';
import { USER_ROLES } from 'variables/user';

const PRIVATE = 'private';
const PUBLIC = 'public';

const publicRoutes = [
  {
    title: 'library',
    path: ROUTES.LIBRARY,
    component: LibraryPage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'contribute',
    path: ROUTES.CONTRIBUTE,
    component: ContributePage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'confirm.submission',
    path: ROUTES.CONFIRM_SUBMISSION,
    component: ConfirmSubmissionPage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'exercise.detail',
    path: ROUTES.LIBRARY_EXERCISE_DETAIL,
    component: ExerciseDetail,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'education_material.detail',
    path: ROUTES.LIBRARY_EDUCATION_MATERIAL_DETAIL,
    component: EducationMaterialDetail,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'questionnaire.detail',
    path: ROUTES.LIBRARY_QUESTIONNAIRE_DETAIL,
    component: QuestionnaireDetail,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'home',
    path: ROUTES.HOME,
    component: PublicHomePage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: true
  }
];

const routes = [
  {
    title: 'dashboard',
    path: ROUTES.ADMIN_DASHBOARD,
    component: DashboardPage,
    exact: true,
    type: PRIVATE
  },
  {
    title: 'resources',
    path: ROUTES.ADMIN_RESOURCES,
    component: ServiceSetupPage,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    title: 'users',
    path: ROUTES.ADMIN_USERS,
    component: UserPage,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_USER]
  },
  {
    title: 'exercise.create',
    path: ROUTES.EXERCISE_CREATE,
    component: CreateExercise,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    title: 'exercise.edit',
    path: ROUTES.ADMIN_RESOURCES_EDIT,
    component: CreateExercise,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    title: 'education_material.create',
    path: ROUTES.EDUCATION_MATERIAL_CREATE,
    component: CreateEducationMaterial,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    title: 'education_material.edit',
    path: ROUTES.ADMIN_RESOURCES_EDUCATION_MATERIAL_EDIT,
    component: CreateEducationMaterial,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    title: 'questionnaire.create',
    path: ROUTES.QUESTIONNAIRE_CREATE,
    component: CreateQuestionnaire,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    title: 'questionnaire.edit',
    path: ROUTES.QUESTIONNAIRE_EDIT,
    component: CreateQuestionnaire,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_RESOURCE]
  },
  {
    title: 'category',
    path: ROUTES.ADMIN_CATEGORIES,
    component: CategoryPage,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.SETUP_CATEGORY]
  },
  {
    title: 'translation',
    path: ROUTES.ADMIN_TRANSLATIONS,
    component: Translation,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_TRANSLATION]
  },
  {
    title: 'static_page',
    path: ROUTES.ADMIN_STATIC_PAGES,
    component: StaticPage,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_STATIC_PAGE]
  },
  {
    title: 'language',
    path: ROUTES.ADMIN_TRANSLATIONS_LANGUAGE,
    component: Language,
    exact: true,
    type: PRIVATE,
    roles: [USER_ROLES.MANAGE_TRANSLATION]
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
  ...publicRoutes,
  {
    title: 'not_found_page',
    path: '*',
    component: NotFoundPage,
    type: PRIVATE
  }
];

const RouteSwitch = () => {
  const routeComponents = routes.map(({ path, component, exact, type, title, roles, defaultTemplate }, key) => {
    return type === PUBLIC ? (
      <Route exact={!!exact} path={path} key={key}>
        <DefaultLayout component={component} title={title} defaultTemplate={defaultTemplate} />
      </Route>
    ) : (
      <PrivateRoute exact={!!exact} path={path} key={key} roles={roles}>
        <AdminLayout component={component} title={title} />
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
