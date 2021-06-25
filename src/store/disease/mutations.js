const getDiseasesRequest = () => ({
  type: 'GET_DISEASES_REQUEST'
});

const getDiseasesSuccess = (data) => ({
  type: 'GET_DISEASES_SUCCESS',
  data
});

const getDiseasesFail = () => ({
  type: 'GET_DISEASES_FAIL'
});

const getDiseaseRequest = () => ({
  type: 'GET_DISEASE_REQUEST'
});

const getDiseaseSuccess = (data, filters) => ({
  type: 'GET_DISEASE_SUCCESS',
  data,
  filters
});

const getDiseaseFail = () => ({
  type: 'GET_DISEASE_FAIL'
});

const createDiseaseRequest = () => ({
  type: 'CREATE_DISEASE_REQUEST'
});

const createDiseaseSuccess = () => ({
  type: 'CREATE_DISEASE_SUCCESS'
});

const createDiseaseFail = () => ({
  type: 'CREATE_DISEASE_FAIL'
});

const updateDiseaseRequest = () => ({
  type: 'UPDATE_DISEASE_REQUEST'
});

const updateDiseaseSuccess = () => ({
  type: 'UPDATE_DISEASE_SUCCESS'
});

const updateDiseaseFail = () => ({
  type: 'UPDATE_DISEASE_FAIL'
});

const deleteDiseaseRequest = () => ({
  type: 'DELETE_DISEASE_REQUEST'
});

const deleteDiseaseSuccess = (data) => ({
  type: 'DELETE_DISEASE_SUCCESS',
  data
});

const deleteDiseaseFail = () => ({
  type: 'DELETE_DISEASE_FAIL'
});

const uploadDiseasesRequest = () => ({
  type: 'UPLOAD_DISEASES_REQUEST'
});

const uploadDiseasesSuccess = () => ({
  type: 'UPLOAD_DISEASES_SUCCESS'
});

const uploadDiseasesFail = () => ({
  type: 'UPLOAD_DISEASES_FAIL'
});

export const mutation = {
  getDiseasesRequest,
  getDiseasesFail,
  getDiseasesSuccess,
  createDiseaseRequest,
  createDiseaseSuccess,
  createDiseaseFail,
  updateDiseaseRequest,
  updateDiseaseSuccess,
  updateDiseaseFail,
  deleteDiseaseRequest,
  deleteDiseaseSuccess,
  deleteDiseaseFail,
  uploadDiseasesFail,
  uploadDiseasesSuccess,
  uploadDiseasesRequest,
  getDiseaseRequest,
  getDiseaseFail,
  getDiseaseSuccess
};
