import { useState, useEffect } from "react";
import { Logs, Moon, Search, Sun } from "lucide-react";
import { NavbarProps } from "../../Type";
import { useThemeStore } from "../../Store/useThemeStore";
import { useAuthStore } from "../../Store/useAuthStore";

export default function Navbar({
  isCollapsed,
  setIsCollapsed,
  className,
  NavWidth,
}: NavbarProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();

  return (
    <nav
      className={`${className} flex-1 fixed top-0 right-0 overflow-x-hidden h-16 px-4 items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 transition-all duration-200`}
      style={{
        width: NavWidth,
      }}
    >
      <div className="flex items-center space-x-2 w-1/2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          aria-label="Toggle dark mode"
        >
          <Logs
            strokeWidth={0.5}
            className="w-10 h-10 p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/3"
          />
        </button>
        <div className="hidden md:block relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white dark:bg-white/3 text-sm text-gray-800 dark:text-white focus:outline-none focus:shadow-md focus:ring-blue-300 focus:border-blue-300 border border-gray-300 dark:border-gray-600 transition duration-200"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          aria-label="Toggle dark mode"
        >
          {theme ? (
            <Sun className="w-10 h-10 p-2 rounded-full border border-gray-300 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/3" />
          ) : (
            <Moon className="w-10 h-10 p-2 rounded-full border border-gray-300 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/3" />
          )}
        </button>

        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-800 dark:text-white font-medium">
          {user?.firstName} {user?.lastName}
        </span>
      </div>
    </nav>
  );
}
