import axios from 'utils/axios';

const getExercises = () => {
  return axios.get('/exercise')
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const createExercise = payload => {
  return axios.post('/exercise', payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const updateExercise = (id, payload) => {
  return axios.put(`/exercise/${id}`, payload)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

const deleteExercise = id => {
  return axios.delete(`/exercise/${id}`)
    .then(
      res => {
        return res.data;
      }
    )
    .catch((e) => {
      return e.response.data;
    });
};

export const Exercise = {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise
};
