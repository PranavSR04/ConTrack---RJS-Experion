import axios, { InternalAxiosRequestConfig } from "axios";


// Create a custom Axios instance with a base URL
const axiosInstance = axios.create({
	baseURL: "http://localhost:8000", // Replace with your API base URL
});

// Define the exclude paths (paths where token should not be added)
const excludePaths = ["api/loginAzure"];

// Add a request interceptor to the axios instance
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig<any>) => {
		// Check if the request URL matches any of the exclude paths
		console.log("Request URL:", config.url);
		const isExcludedPath = excludePaths.some((path) =>
			config.url?.includes(path)
		);
		console.log("Is excluded path?", isExcludedPath);

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
		console.log("Error", error);
		return Promise.reject(error);
	}
);

// Response interceptor to handle session expiration
axiosInstance.interceptors.response.use(
	(response) => {
		// Check if the response status is 401 (Unauthorized)
		if (response.status === 401) {
      localStorage.clear();
			console.log("Session expired or unauthorized");
      window.location.href = '/session/expired';
		}
		return response;
	},
	(error) => {
		// Check if the error response status is 401 (Unauthorized)
		if (error.response && error.response.status === 401) {
      localStorage.clear();
			console.log("Session expired or unauthorized");
      window.location.href = '/session/expired';
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
