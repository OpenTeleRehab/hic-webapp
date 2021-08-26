import axios from 'utils/axios';

const getTranslations = (payload) => {
  const langParam = payload.lang ? `?lang=${payload.lang}` : '';
  return axios.get(`/translation/i18n/${payload.portal}` + langParam)
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
