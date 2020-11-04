import axios from 'axios';
import settings from 'settings';

// Add a request interceptor
const axiosInstance = axios.create({
  baseURL: settings.apiUrl
});

export default axiosInstance;
