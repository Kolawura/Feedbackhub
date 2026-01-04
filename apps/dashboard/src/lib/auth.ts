// auth.api.ts
import { api } from "../lib/axios";

export const getMe = async () => {
  const res = await api.get("/api/auth/me", { withCredentials: true });
  return res.data.data;
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
