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

export const mutation = {
  getEducationMaterialRequest,
  getEducationMaterialSuccess,
  getEducationMaterialFail,
  createEducationMaterialRequest,
  createEducationMaterialSuccess,
  createEducationMaterialFail,
  updateEducationMaterialRequest,
  updateEducationMaterialSuccess,
  updateEducationMaterialFail
};
