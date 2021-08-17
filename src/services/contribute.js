import axios from 'utils/axios';
import _ from 'lodash';

const contributeSubmission = (payload) => {
  const formData = new FormData();

  _.forIn(payload, (value, key) => {
    formData.append(key, value);
  });

  return axios.post('/contribute/send-notification', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Contribute = {
  contributeSubmission
};
