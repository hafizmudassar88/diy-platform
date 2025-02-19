import axios from "axios";
import https from "https";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Replace with your server's IP if needed
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false, // Disable SSL certificate validation
  // }),
  // withCredentials: true,
});

// Interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Add the token to the request headers if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
