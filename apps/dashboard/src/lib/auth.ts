// auth.api.ts
import { AxiosError } from "axios";
import { api } from "../lib/axios";

export const getMe = async () => {
  try {
    const res = await api.get("/api/auth/me", { withCredentials: true });
    return res.data.data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.status === 401) return null;
    throw err;
  }
};

export const loginRequest = async (data: {
  identifier: string;
  password: string;
}) => {
  const res = await api.post("/api/auth/login", data, {
    withCredentials: true,
  });
  return res.data.user;
};

export const registerRequest = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}) => {
  const res = await api.post("/api/auth/register", data, {
    withCredentials: true,
  });
  return res.data.user;
};

export const logoutRequest = async () => {
  await api.post("/api/auth/logout", null, {
    withCredentials: true,
  });
};
