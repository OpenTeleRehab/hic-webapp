import axios from 'utils/axios';

const getTranslations = (lang) => {
  const langParam = lang ? `?lang=${lang}` : '';
  return axios.get('/translation/i18n/admin_portal' + langParam)
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
