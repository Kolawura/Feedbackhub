import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
