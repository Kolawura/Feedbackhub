import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../../Store/useThemeStore";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          FeedbackHub
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline px-4 py-2 rounded-md transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
          >
            Register
          </Link>
          <button
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <Sun
                size={25}
                className="w-10 h-10 p-2 rounded-full border border-gray-300 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/3"
              />
            ) : (
              <Moon
                size={25}
                className="w-10 h-10 p-2 rounded-full border border-gray-300 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/3"
              />
            )}
          </button>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          <Link
            to="/login"
            className="block text-sm text-gray-700 dark:text-gray-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Register
          </Link>
          <button
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
          >
            {theme === "dark" ? (
              <span className="flex items-center gap-2">
                <Sun size={16} /> Light Mode
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Moon size={16} /> Dark Mode
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
