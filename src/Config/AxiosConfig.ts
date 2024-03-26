import axios, { InternalAxiosRequestConfig } from 'axios';
 
 
// Create a custom Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
});
 
// Define the exclude paths (paths where token should not be added)
const excludePaths = ['api/loginAzure'];
 
// Add a request interceptor to the axios instance
axiosInstance.interceptors.request.use(
  (config:InternalAxiosRequestConfig<any>) => {
    // Check if the request URL matches any of the exclude paths
    console.log('Request URL:', config.url);
    const isExcludedPath = excludePaths.some((path) => config.url?.includes(path));
    console.log('Is excluded path?', isExcludedPath);
 
    // If the path is not excluded, add the Bearer token to the header
    if (!isExcludedPath) {
      const authToken = localStorage.getItem("access_token"); // Replace with your actual JWT token
      console.log(authToken);
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
export  default axiosInstance;