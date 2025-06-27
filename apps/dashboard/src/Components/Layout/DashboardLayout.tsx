import { Outlet } from "react-router-dom";
import Sidebar from "../Bars/Sidebar";
import Navbar from "../Bars/Navbar";

interface DashboardLayoutProps {
  Expand: boolean;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const DashboardLayout = ({
  Expand,
  isCollapsed,
  setIsCollapsed,
  handleMouseEnter,
  handleMouseLeave,
}: DashboardLayoutProps) => {
  const NavWidth = Expand ? "calc(100% - 16rem)" : "calc(100% - 4rem)";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-outfit min-h-screen overflow-x-hidden">
      <Sidebar
        isCollapsed={isCollapsed}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        Expand={Expand}
      />
      <Navbar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        className="flex lg:hidden w-full transition-all duration-200"
      />
      <main
        className={`flex-1 transition-all duration-200 overflow-x-hidden ml-16 ${
          Expand ? "lg:ml-64" : ""
        }`}
      >
        <Navbar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          Expand={Expand}
          className="hidden lg:flex w-full h-16 pr-16"
          NavWidth={NavWidth}
        />
        <div className="p-4 mt-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
