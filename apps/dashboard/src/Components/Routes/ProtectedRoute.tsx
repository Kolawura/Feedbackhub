import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
