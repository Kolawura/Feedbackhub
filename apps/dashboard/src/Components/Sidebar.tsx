import {
  ChartNoAxesCombined,
  Home,
  LayoutDashboard,
  MessageSquare,
  MessageSquareCode,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarProps } from "../Type";

const Sidebar = ({
  isCollapsed,
  handleMouseEnter,
  handleMouseLeave,
  Expand,
}: SidebarProps) => {
  console.log(isCollapsed);
  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${
        Expand ? "w-64" : "w-16 "
      } mt-16 lg:mt-0 fixed h-screen transition-all duration-200 dark:bg-gray-900 bg-white text-gray-700 border-r border-gray-200 dark:border-gray-800 dark:text-gray-200 flex flex-col p-4 py-8`}
    >
      <div className="flex items-center justify-center mb-10 gap-4">
        <MessageSquareCode size={25} />
        {Expand && <h2 className="text-2xl font-semibold">FeedbackHub</h2>}
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className={`flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/4 rounded-lg px-4 py-2 text-lg h-12 ${
            Expand ? "" : "justify-center"
          }`}
        >
          <div>
            <Home size={25} />
          </div>
          {Expand && <span>Home</span>}
        </Link>

        <Link
          to="/Dashboard"
          className={`flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/4 rounded-lg px-4 py-2 text-lg h-12 ${
            Expand ? "" : "justify-center"
          }`}
        >
          <div>
            {/* <Home size={25} /> */}
            <LayoutDashboard size={25} />
          </div>
          {Expand && <span>Dashboard</span>}
        </Link>

        <Link
          to="/analytics"
          className={`flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/4 rounded-lg px-4 py-2 text-lg h-12 ${
            Expand ? "" : "justify-center"
          }`}
        >
          <div>
            <ChartNoAxesCombined size={25} />
          </div>
          {Expand && <span>Analytics</span>}
        </Link>

        <Link
          to="/feedback"
          className={`flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/4 rounded-lg px-4 py-2 text-lg h-12 ${
            Expand ? "" : "justify-center"
          }`}
        >
          <div>
            <MessageSquare size={25} />
          </div>{" "}
          {Expand && <span>Feedback</span>}
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/4 rounded-lg px-4 py-2 text-lg h-12 ${
            Expand ? "" : "justify-center"
          }`}
        >
          <div>
            <Settings size={25} />
          </div>{" "}
          {Expand && <span>Settings</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
