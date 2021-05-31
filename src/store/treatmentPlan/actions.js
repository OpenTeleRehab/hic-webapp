import { TreatmentPlan } from 'services/treatmentPlan';
import { mutation } from './mutations';
import { showErrorNotification } from 'store/notification/actions';
import { showSpinner } from 'store/spinnerOverlay/actions';

export const getTreatmentPlans = payload => async dispatch => {
  dispatch(mutation.getTreatmentPlansRequest());
  dispatch(showSpinner(true));
  const data = await TreatmentPlan.getTreatmentPlans(payload);
  if (data.success) {
    dispatch(mutation.getTreatmentPlansSuccess(data.data, payload));
    dispatch(showSpinner(false));
    return data.info;
  } else {
    dispatch(mutation.getTreatmentPlansFail());
    dispatch(showSpinner(false));
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};

export const getTreatmentPlansDetail = payload => async dispatch => {
  dispatch(mutation.getTreatmentPlansDetailRequest());
  const data = await TreatmentPlan.getTreatmentPlansDetail(payload);
  if (data.success) {
    dispatch(mutation.getTreatmentPlansDetailSuccess(data.data, payload));
    return data.info;
  } else {
    dispatch(mutation.getTreatmentPlansDetailFail());
    dispatch(showErrorNotification('toast_title.error_message', data.message));
  }
};
