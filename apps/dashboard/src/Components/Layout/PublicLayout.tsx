import { Outlet } from "react-router-dom";
import HomeNavbar from "../Bars/HomeNavbar";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <HomeNavbar />
      <Outlet />
    </div>
  );
};
