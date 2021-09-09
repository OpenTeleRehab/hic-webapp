const getEducationMaterialsRequest = () => ({
  type: 'GET_EDUCATION_MATERIALS_REQUEST'
});

const getEducationMaterialsSuccess = (data, filters) => ({
  type: 'GET_EDUCATION_MATERIALS_SUCCESS',
  data,
  filters
});

const getEducationMaterialsFail = () => ({
  type: 'GET_EDUCATION_MATERIALS_FAIL'
});

const getEducationMaterialRequest = () => ({
  type: 'GET_EDUCATION_MATERIAL_REQUEST'
});

const getEducationMaterialSuccess = (data) => ({
  type: 'GET_EDUCATION_MATERIAL_SUCCESS',
  data
});

const getEducationMaterialFail = () => ({
  type: 'GET_EDUCATION_MATERIAL_FAIL'
});

const getEditTranslationRequest = () => ({
  type: 'GET_EDIT_TRANSLATION_REQUEST'
});

const getEditTranslationSuccess = (data) => ({
  type: 'GET_EDIT_TRANSLATION_SUCCESS',
  data
});

const getEditTranslationFail = () => ({
  type: 'GET_EDIT_TRANSLATION_FAIL'
});

const createEducationMaterialRequest = () => ({
  type: 'CREATE_EDUCATION_MATERIAL_REQUEST'
});

const createEducationMaterialSuccess = (data) => ({
  type: 'CREATE_EDUCATION_MATERIAL_SUCCESS',
  data
});

const createEducationMaterialFail = () => ({
  type: 'CREATE_EDUCATION_MATERIAL_FAIL'
});

const contributeEducationMaterialRequest = () => ({
  type: 'CONTRIBUTE_EDUCATION_MATERIAL_REQUEST'
});

const contributeEducationMaterialSuccess = (data) => ({
  type: 'CONTRIBUTE_EDUCATION_MATERIAL_SUCCESS',
  data
});

const contributeEducationMaterialFail = () => ({
  type: 'CONTRIBUTE_EDUCATION_MATERIAL_FAIL'
});

const updateEducationMaterialRequest = () => ({
  type: 'UPDATE_EDUCATION_MATERIAL_REQUEST'
});

const updateEducationMaterialSuccess = (data) => ({
  type: 'UPDATE_EDUCATION_MATERIAL_SUCCESS',
  data
});

const updateEducationMaterialFail = () => ({
  type: 'UPDATE_EDUCATION_MATERIAL_FAIL'
});

const deleteEducationMaterialRequest = () => ({
  type: 'DELETE_EDUCATION_MATERIAL_REQUEST'
});

const deleteEducationMaterialSuccess = (data) => ({
  type: 'DELETE_EDUCATION_MATERIAL_SUCCESS',
  data
});

const deleteEducationMaterialFail = () => ({
  type: 'DELETE_EDUCATION_MATERIAL_FAIL'
});

const clearFilterEducationMaterialsRequest = () => ({
  type: 'CLEAR_FILTER_EDUCATION_MATERIALS_REQUEST'
});

const clearEditTranslationRequest = () => ({
  type: 'CLEAR_EDIT_TRANSLATION_REQUEST'
});

const rejectEducationMaterialFail = () => ({
  type: 'REJECT_EDUCATION_MATERIAL_FAIL'
});

const rejectEducationMaterialRequest = () => ({
  type: 'REJECT_EDUCATION_MATERIAL_REQUEST'
});

const rejectEducationMaterialSuccess = (data) => ({
  type: 'REJECT_EDUCATION_MATERIAL_SUCCESS',
  data
});

const rejectEditTranslationRequest = () => ({
  type: 'REJECT_EDIT_TRANSLATION_REQUEST'
});

const rejectEditTranslationSuccess = (data) => ({
  type: 'REJECT_EDIT_TRANSLATION_SUCCESS',
  data
});

const rejectEditTranslationFail = () => ({
  type: 'REJECT_EDIT_TRANSLATION_FAIL'
});

const approveEditTranslationRequest = () => ({
  type: 'APPROVE_EDIT_TRANSLATION_REQUEST'
});

const approveEditTranslationSuccess = (data) => ({
  type: 'APPROVE_EDIT_TRANSLATION_SUCCESS',
  data
});

const approveEditTranslationFail = () => ({
  type: 'APPROVE_EDIT_TRANSLATION_FAIL'
});

const setFilterEducationMaterialsRequest = (data) => ({
  type: 'SET_FILTER_EDUCATION_MATERIALS_REQUEST',
  data
});

export const mutation = {
  getEducationMaterialRequest,
  getEducationMaterialSuccess,
  getEducationMaterialFail,
  getEditTranslationRequest,
  getEditTranslationSuccess,
  getEditTranslationFail,
  createEducationMaterialRequest,
  createEducationMaterialSuccess,
  createEducationMaterialFail,
  contributeEducationMaterialRequest,
  contributeEducationMaterialSuccess,
  contributeEducationMaterialFail,
  updateEducationMaterialRequest,
  updateEducationMaterialSuccess,
  updateEducationMaterialFail,
  getEducationMaterialsFail,
  getEducationMaterialsRequest,
  getEducationMaterialsSuccess,
  deleteEducationMaterialRequest,
  deleteEducationMaterialSuccess,
  deleteEducationMaterialFail,
  clearFilterEducationMaterialsRequest,
  clearEditTranslationRequest,
  rejectEducationMaterialSuccess,
  rejectEducationMaterialFail,
  rejectEducationMaterialRequest,
  rejectEditTranslationRequest,
  rejectEditTranslationSuccess,
  rejectEditTranslationFail,
  approveEditTranslationRequest,
  approveEditTranslationSuccess,
  approveEditTranslationFail,
  setFilterEducationMaterialsRequest
};
