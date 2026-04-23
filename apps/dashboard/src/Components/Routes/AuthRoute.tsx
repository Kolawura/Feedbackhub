import { Outlet, useLocation } from "react-router-dom";
import HomeNavbar from "../Bars/HomeNavbar";

export const AuthRoute = () => {
  const { pathname } = useLocation();
  const isOnboarding = pathname === "/setup";

  return (
    <>
      {isOnboarding && <HomeNavbar />}
      <Outlet />
    </>
  );
};
