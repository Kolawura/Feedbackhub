import { Outlet } from "react-router-dom";
import HomeNavbar from "../Bars/HomeNavbar";

export const PublicRoute = () => {
  return (
    <>
      <HomeNavbar />
      <Outlet />;
    </>
  );
};
