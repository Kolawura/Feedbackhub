import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Bars/Sidebar";
import Navbar from "../Bars/Navbar";

function useIsMd() {
  const [isMd, setIsMd] = useState(() => window.innerWidth >= 768);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMd;
}

interface DashboardRouteProps {
  Expand: boolean;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardRoute = ({
  Expand,
  isCollapsed,
  setIsCollapsed,
}: DashboardRouteProps) => {
  const isMd = useIsMd();

  const sidebarW = Expand ? "224px" : "64px";
  const mainMargin = isMd ? sidebarW : "0px";
  const navWidth = isMd ? `calc(100% - ${sidebarW})` : "100%";

  return (
    <div className="min-h-screen bg-[var(--bg)] font-serif overflow-x-hidden">
      <Sidebar isCollapsed={isCollapsed} Expand={Expand} />
      <main
        className="transition-all duration-200 overflow-x-hidden"
        style={{ marginLeft: mainMargin }}
      >
        <Navbar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          Expand={Expand}
          className="flex w-full"
          NavWidth={navWidth}
        />
        <div className="mt-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
