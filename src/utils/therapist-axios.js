import axios from 'axios';

// Add a request interceptor
const therapistaxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_THERAPIST_API_BASE_URL
});

export default therapistaxiosInstance;
