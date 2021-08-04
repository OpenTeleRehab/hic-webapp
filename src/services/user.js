import customAxios from 'utils/axios';
import axios from 'axios';

window.getUserAxiosCancel = undefined;
const CancelToken = axios.CancelToken;

const createUser = payload => {
  return customAxios.post('/admin', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getUsers = payload => {
  if (window.getUserAxiosCancel !== undefined) {
    window.getUserAxiosCancel();
  }
  return customAxios.get('/admin', {
    params: payload,
    cancelToken: new CancelToken(function executor (c) {
      window.getUserAxiosCancel = c;
    })
  }).then(
    res => {
      return res.data;
    }
  ).catch((e) => {
    if (e.response && e.response.data) {
      return e.response.data;
    } else {
      return { success: false };
    }
  });
};

const updateUser = (id, payload) => {
  return customAxios.put(`/admin/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateUserStatus = (id, payload) => {
  return customAxios.post(`/admin/updateStatus/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const deleteUser = (id, payload) => {
  return customAxios.delete(`/admin/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const getReviewers = () => {
  return customAxios.get('/admin/get-reviewer/info')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const resendEmail = (id) => {
  return customAxios.post(`/admin/resend-email/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const User = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserStatus,
  resendEmail,
  getReviewers
};
