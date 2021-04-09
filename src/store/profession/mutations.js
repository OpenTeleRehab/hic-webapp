const getProfessionRequest = () => ({
  type: 'GET_PROFESSIONS_REQUEST'
});

const getProfessionsSuccess = (data) => ({
  type: 'GET_PROFESSIONS_SUCCESS',
  data
});

const getProfessionsFail = () => ({
  type: 'GET_PROFESSIONS_FAIL'
});

const createProfessionRequest = () => ({
  type: 'CREATE_PROFESSIONS_REQUEST'
});

const createProfessionsSuccess = () => ({
  type: 'CREATE_PROFESSIONS_SUCCESS'
});

const createProfessionsFail = () => ({
  type: 'CREATE_PROFESSIONS_FAIL'
});

const updateProfessionRequest = () => ({
  type: 'UPDATE_PROFESSIONS_REQUEST'
});

const updateProfessionsSuccess = () => ({
  type: 'UPDATE_PROFESSIONS_SUCCESS'
});

const updateProfessionsFail = () => ({
  type: 'UPDATE_PROFESSIONS_FAIL'
});

const deleteProfessionRequest = () => ({
  type: 'DELETE_PROFESSION_REQUEST'
});

const deleteProfessionSuccess = (data) => ({
  type: 'DELETE_PROFESSION_SUCCESS',
  data
});

const deleteProfessionFail = () => ({
  type: 'DELETE_PROFESSION_FAIL'
});

export const mutation = {
  getProfessionRequest,
  getProfessionsFail,
  getProfessionsSuccess,
  createProfessionRequest,
  createProfessionsSuccess,
  createProfessionsFail,
  updateProfessionRequest,
  updateProfessionsSuccess,
  updateProfessionsFail,
  deleteProfessionRequest,
  deleteProfessionSuccess,
  deleteProfessionFail
};
