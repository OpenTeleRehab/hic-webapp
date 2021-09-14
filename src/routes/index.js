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
import TermConditionPage from 'views/_public/TermCondition';
import AboutUsPage from 'views/_public/AboutUs';
import AcknowledgmentPage from 'views/_public/Acknowlegment';
import ExerciseDetail from 'views/_public/Library/Exercise/detail';
import EducationMaterialDetail from 'views/_public/Library/EducationMaterial/detail';
import QuestionnaireDetail from 'views/_public/Library/Questionnaire/detail';

import DashboardPage from 'views/Dashboard';
import ServiceSetupPage from 'views/ServiceSetup';
import NotFoundPage from 'components/NotFound';
import CategoryPage from 'views/Category';
import Translation from 'views/Translation';
import Language from 'views/Translation/Language';
import CreateExercise from 'views/ServiceSetup/Exercise/create';
import CreateEducationMaterial from 'views/ServiceSetup/EducationMaterial/create';
import CreateQuestionnaire from 'views/ServiceSetup/Questionnaire/create';
import ProfilePage from 'views/Profile';
import UserPage from 'views/User';
import StaticPage from 'views/StaticPage';

import * as ROUTES from 'variables/routes';
import { USER_ROLES } from 'variables/user';
import { useSelector } from 'react-redux';
import settings from '../settings';

const PRIVATE = 'private';
const PUBLIC = 'public';

const publicRoutes = [
  {
    title: 'home',
    path: ROUTES.HOME,
    component: PublicHomePage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: true
  },
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
    title: 'translation.exercise.edit',
    path: ROUTES.EXERCISE_EDIT_TRANSLATION,
    component: ContributePage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'translation.education_material.edit',
    path: ROUTES.EDUCATION_MATERIAL_EDIT_TRANSLATION,
    component: ContributePage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: false
  },
  {
    title: 'translation.questionnaire.edit',
    path: ROUTES.QUESTIONNAIRE_EDIT_TRANSLATION,
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
    title: 'about_us',
    path: ROUTES.ABOUT_US,
    component: AboutUsPage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: true
  },
  {
    title: 'term_condition',
    path: ROUTES.TERM_CONDITION,
    component: TermConditionPage,
    exact: true,
    type: PUBLIC,
    defaultTemplate: true
  },
  {
    title: 'acknowledgment',
    path: ROUTES.ACKNOWLEDGMENT,
    component: AcknowledgmentPage,
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
  ...publicRoutes,
  {
    title: '404',
    path: ROUTES.ADMIN + '/*',
    component: NotFoundPage,
    type: PRIVATE
  },
  {
    title: '404',
    path: '*',
    component: NotFoundPage,
    type: PUBLIC
  }
];

const RouteSwitch = () => {
  const { activeLanguage } = useSelector((state) => state.language);

  const routeComponents = routes.map(({ path, component, exact, type, title, roles, defaultTemplate }, key) => {
    if (type === PUBLIC) {
      const localizedPath = activeLanguage === settings.locale ? path : '/' + activeLanguage + path;
      console.log(localizedPath);
      return (
        <Route exact={!!exact} path={localizedPath} key={key}>
          <DefaultLayout component={component} title={title} defaultTemplate={defaultTemplate} />
        </Route>
      );
    } else {
      return (
        <PrivateRoute exact={!!exact} path={path} key={key} roles={roles}>
          <AdminLayout component={component} title={title} />
        </PrivateRoute>
      );
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

export default RouteSwitch;
