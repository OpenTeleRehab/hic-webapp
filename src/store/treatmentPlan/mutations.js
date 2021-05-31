const getTreatmentPlansRequest = () => ({
  type: 'GET_TREATMENT_PLANS_REQUEST'
});

const getTreatmentPlansSuccess = (data) => ({
  type: 'GET_TREATMENT_PLANS_SUCCESS',
  data
});

const getTreatmentPlansFail = () => ({
  type: 'GET_TREATMENT_PLANS_FAIL'
});

const getTreatmentPlansDetailRequest = () => ({
  type: 'GET_TREATMENT_PLANS_DETAIL_REQUEST'
});

const getTreatmentPlansDetailSuccess = (data) => ({
  type: 'GET_TREATMENT_PLANS_DETAIL_SUCCESS',
  data
});

const getTreatmentPlansDetailFail = () => ({
  type: 'GET_TREATMENT_PLANS_DETAIL_FAIL'
});

export const mutation = {
  getTreatmentPlansRequest,
  getTreatmentPlansSuccess,
  getTreatmentPlansFail,
  getTreatmentPlansDetailRequest,
  getTreatmentPlansDetailSuccess,
  getTreatmentPlansDetailFail
};
