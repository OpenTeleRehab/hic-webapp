import axios from 'utils/axios';

const getTranslations = () => {
  return axios.get('/translation/i18n/admin_portal')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Translation = {
  getTranslations
};
