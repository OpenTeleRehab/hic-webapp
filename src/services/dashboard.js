import axios from 'utils/axios';

const getDataForCountryAdmin = countryId => {
  return axios.get('chart/country-admin-dashboard', { params: countryId })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Dashboard = {
  getDataForCountryAdmin
};
