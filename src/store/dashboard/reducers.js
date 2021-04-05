import { initialState } from './states';

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COUNTRY_ADMIN_DATA_SUCCESS': {
      return Object.assign({}, state, {
        countyAdminData: action.data
      });
    }
    case 'GET_CHART_DATA_GLOBAL_ADMIN_SUCCESS': {
      return Object.assign({}, state, {
        globalAdminData: action.data
      });
    }
    case 'GET_CHART_DATA_CLINIC_ADMIN_SUCCESS': {
      return Object.assign({}, state, {
        clinicAdminData: action.data
      });
    }
    default:
      return state;
  }
};
