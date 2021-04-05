import { initialState } from './states';

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COUNTRY_ADMIN_DATA_SUCCESS': {
      return Object.assign({}, state, {
        countyAdminData: action.data
      });
    }
    default:
      return state;
  }
};
