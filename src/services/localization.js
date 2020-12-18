import axios from 'utils/axios';

const getLocalizations = payload => {
  return axios.get('/translation', {
    params: payload
  }).then(
    res => {
      return res.data;
    }
  )
    .catch((e) => {
      if (e.response && e.response.data) {
        return e.response.data;
      } else {
        return { success: false };
      }
    });
};

export const Localization = {
  getLocalizations
};
