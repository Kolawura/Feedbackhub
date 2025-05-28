import { Home, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 dark:bg-gray-900 bg-white text-gray-700 border-r border-gray-200 dark:border-gray-800 dark:text-gray-200 flex flex-col p-4 py-8">
      <h2 className="text-2xl font-semibold mb-10">FeedbackHub</h2>

      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-white/3 rounded-lg px-4 py-2 text-lg"
        >
          <Home size={25} /> Dashboard
        </Link>
        <Link
          to="/feedback"
          className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-white/3 rounded-lg px-4 py-2 text-lg"
        >
          <MessageSquare size={25} /> Feedback
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-white/3 rounded-lg px-4 py-2 text-lg"
        >
          <Settings size={25} /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
