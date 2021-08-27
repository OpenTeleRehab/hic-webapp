export const HOME = '/:lang?/';
export const LIBRARY = '/:lang?/library';
export const LIBRARY_EDUCATION = LIBRARY + '#education';
export const LIBRARY_QUESTIONNAIRE = LIBRARY + '#questionnaire';
export const LIBRARY_EXERCISE_DETAIL = LIBRARY + '/exercise/detail/:id';
export const LIBRARY_EDUCATION_MATERIAL_DETAIL = LIBRARY + '/education_material/detail/:id';
export const LIBRARY_QUESTIONNAIRE_DETAIL = LIBRARY + '/questionnaire/detail/:id';

export const CONTRIBUTE = '/:lang?/contribute';
export const CONFIRM_SUBMISSION = '/contribute/confirm-submission';

export const ADMIN = '/admin';
export const ADMIN_DASHBOARD = '/admin';
export const ADMIN_RESOURCES = '/admin/resources';
export const ADMIN_RESOURCES_EDUCATION_MATERIAL = '/admin/resources#education';
export const ADMIN_RESOURCES_QUESTIONNAIRE = '/admin/resources#questionnaire';
export const ADMIN_RESOURCES_EDIT = '/admin/resources/edit/:id';
export const ADMIN_RESOURCES_EDUCATION_MATERIAL_EDIT = '/admin/resources/education_material/edit/:id';
export const ADMIN_RESOURCES_QUESTIONNAIRE_EDIT = '/admin/resources/questionnaire/edit/:id';
export const ADMIN_CATEGORIES = '/admin/categories';
export const ADMIN_TRANSLATIONS = '/admin/translations';
export const ADMIN_TRANSLATIONS_LANGUAGE = ADMIN_TRANSLATIONS + '#language';
export const ADMIN_USERS = '/admin/users';
export const ADMIN_STATIC_PAGES = '/admin/static-pages';
export const ADMIN_STATIC_PAGES_ABOUT_US = ADMIN_STATIC_PAGES + '#about-us';
export const ADMIN_STATIC_PAGES_TERM_CONDITION = ADMIN_STATIC_PAGES + '#term-condition';
export const ADMIN_STATIC_PAGES_ACKNOWLEDGMENT = ADMIN_STATIC_PAGES + '#acknowledgment';
export const ADMIN_CATEGORY_EDUCATION = ADMIN_CATEGORIES + '#education';
export const ADMIN_CATEGORY_QUESTIONNAIRE = ADMIN_CATEGORIES + '#questionnaire';

export const SERVICE_SETUP = '/admin/resources';
export const SERVICE_SETUP_EDUCATION = SERVICE_SETUP + '#education';
export const SERVICE_SETUP_QUESTIONNAIRE = SERVICE_SETUP + '#questionnaire';

export const EXERCISE_CREATE = SERVICE_SETUP + '/exercise/create';
export const EXERCISE_EDIT = SERVICE_SETUP + '/exercise/edit/:id';
export const EDUCATION_MATERIAL_CREATE = SERVICE_SETUP + '/education_material/create';
export const EDUCATION_MATERIAL_EDIT = SERVICE_SETUP + '/education_material/edit/:id';
export const QUESTIONNAIRE_CREATE = SERVICE_SETUP + '/questionnaire/create';
export const QUESTIONNAIRE_EDIT = SERVICE_SETUP + '/questionnaire/edit/:id';

export const PROFILE = '/profile';
export const FAQ = '/faq';
export const TC = '/term-condition';
export const PP = '/privacy-policy';
export const PROFILE_PASSWORD = PROFILE + '#password';
