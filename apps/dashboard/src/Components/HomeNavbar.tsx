// components/HomeNavbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          FeedbackHub
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
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
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
          >
            {darkMode ? (
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
