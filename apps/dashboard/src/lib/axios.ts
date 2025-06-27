import axios from "axios";

export const fetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});
