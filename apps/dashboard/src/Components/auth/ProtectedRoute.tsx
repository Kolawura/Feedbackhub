import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("authToken") || true;
};

export const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};
