import { Outlet, useLocation } from "react-router-dom";
import HomeNavbar from "../Bars/HomeNavbar";

export const AuthRoute = () => {
  const location = useLocation();

  const hideNavbarOnPaths = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarOnPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {shouldShowNavbar && <HomeNavbar />}
      <div className="flex items-center py-4 justify-center">
        <Outlet />
      </div>
    </div>
  );
};
