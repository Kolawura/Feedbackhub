import {
  ChartNoAxesCombined,
  Home,
  LayoutDashboard,
  MessageSquare,
  MessageSquareCode,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SidebarProps } from "../../Type";

const Sidebar = ({
  isCollapsed,
  handleMouseEnter,
  handleMouseLeave,
  Expand,
}: SidebarProps) => {
  console.log(isCollapsed);

  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={25} />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={25} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <ChartNoAxesCombined size={25} />,
    },
    {
      name: "Feedbacks",
      path: "/feedbacks",
      icon: <LayoutDashboard size={25} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={25} />,
    },
  ];

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        Expand ? "w-64" : "w-16 "
      } mt-16 lg:mt-0 fixed h-screen transition-all duration-200 dark:bg-gray-900 bg-white text-gray-700 border-r border-gray-200 dark:border-gray-800 dark:text-gray-200 flex flex-col`}
    >
      <div className="flex items-center justify-center h-16 mb-10 gap-4 border-b border-gray-300 dark:border-gray-700">
        <MessageSquareCode size={25} />
        {Expand && <h2 className="text-2xl font-semibold">FeedbackHub</h2>}
      </div>

      <nav className="flex flex-col p-4 gap-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-lg h-12 ${
                Expand ? "" : "justify-center "
              }${
                isActive
                  ? "text-blue-600 dark:text-blue-600 font-semibold hover:bg-blue-100 dark:hover:bg-blue-950 "
                  : "hover:bg-gray-100 dark:hover:bg-white/4"
              }`}
            >
              <div>{link.icon}</div>
              {Expand && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="flex justify-center items-center">about user</div>
    </aside>
  );
};

export default Sidebar;
