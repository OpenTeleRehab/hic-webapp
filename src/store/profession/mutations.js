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

export const mutation = {
  getProfessionRequest,
  getProfessionsFail,
  getProfessionsSuccess,
  createProfessionRequest,
  createProfessionsSuccess,
  createProfessionsFail,
  updateProfessionRequest,
  updateProfessionsSuccess,
  updateProfessionsFail
};
