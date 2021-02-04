export const DASHBOARD = '/';
export const ADMIN = '/admin';

export const SERVICE_SETUP = '/service-setup';
export const SERVICE_SETUP_EDUCATION = '/service-setup#education';
export const SERVICE_SETUP_QUESTIONNAIRE = '/service-setup#questionnaire';

export const EXERCISE_CREATE = SERVICE_SETUP + '/exercise/create';
export const EXERCISE_EDIT = SERVICE_SETUP + '/exercise/edit/:id';
export const EDUCATION_MATERIAL_CREATE = SERVICE_SETUP + '/education_material/create';
export const EDUCATION_MATERIAL_EDIT = SERVICE_SETUP + '/education_material/edit/:id';
export const QUESTIONNAIRE_CREATE = SERVICE_SETUP + '/questionnaire/create';

export const THERAPIST = '/therapist';
export const CATEGORY = '/category';

export const SETTING = '/setting';
export const SETTING_TRANSLATIONS = SETTING + '#translation';
export const SETTING_TERM_AND_CONDITION = SETTING + '#term_and_condition';
export const SETTING_SYSTEM_LIMIT = SETTING + '#system_limit';
export const SETTING_CLINIC = SETTING + '#clinic';
export const SETTING_PROFESSION = SETTING + '#profession';
export const SETTING_LANGUAGE = SETTING + '#language';

export const PROFILE = '/profile';
export const PROFILE_EDIT = PROFILE + '#edit';
export const PROFILE_PASSWORD = PROFILE + '#password';
