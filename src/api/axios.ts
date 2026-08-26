import axios from "axios";
import { tokenStorage } from "@/lib/storage";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await tokenStorage.getItem("authToken");
      if (token && token !== "undefined" && token !== "null" && token.trim() !== "") {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    } catch (error) {
      console.error("Error reading token from storage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
