import { useAuthStore } from "../Store/useAuthStore";
import { NavigateFunction } from "react-router-dom";

export const logoutAndRedirect = (navigate: NavigateFunction) => {
  const { logoutUser } = useAuthStore.getState();
  logoutUser();
  navigate("/login");
};
