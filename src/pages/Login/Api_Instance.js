import axios from "axios";
// import store from "../../redux/store";
// import { refreshToken } from "./LoginApi";
const API_BASE_URL = "http://localhost:8000";

// Create an Axios instance with default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies (e.g., accessToken)
});


// Add an interceptor to include the Authorization token dynamically
api.interceptors.request.use(async(config) => {
  let token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {

    // if (!token) {
    //   // If no token, try refreshing it
    //   const result = await store.dispatch(refreshToken());
  
    //   if (result.payload) {
    //     token = result.payload; // Get new token
    //   } else {
    //     throw new Error("Session expired. Please log in again.");
    //   }
    // }




    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
