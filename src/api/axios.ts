import axios from "axios";

const api = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_API || "",
  baseURL: "http://192.168.1.116:3036/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
