import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
