import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
