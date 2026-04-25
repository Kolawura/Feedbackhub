import { useState } from "react";
import {
  Logs,
  Moon,
  Sun,
  Search,
  Menu,
  X,
  LayoutDashboard,
  MessageSquare,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  Home,
  Code2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NavbarProps } from "../../Type";
import { useThemeStore } from "../../Store/useThemeStore";
import { useAuth } from "../../Hooks/useAuth";
import { NavLinks } from "./NavLinks";

export default function Navbar({
  isCollapsed,
  setIsCollapsed,
  className,
  NavWidth,
}: NavbarProps) {
  const { theme, toggleTheme, resetToSystem, isSystemDefault } =
    useThemeStore();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`${className} fixed top-0 right-0 h-14 flex items-center justify-between px-4 z-30 border-b bg-[var(--bg-surface)] border-[var(--border)]`}
        style={{ width: NavWidth }}
      >
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Sidebar toggle — only shown on md+ (sidebar is hidden on mobile) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors p-1.5 hover:bg-[var(--bg-hover)] border border-transparent hover:border-[var(--border)]"
            aria-label="Toggle sidebar"
          >
            <Logs size={16} />
          </button>

          {/* Mobile: logo */}
          <Link
            to={"/"}
            className="md:hidden font-mono text-xs text-[var(--amber)] tracking-[0.2em] uppercase font-bold"
          >
            ◆ FeedbackHub
          </Link>

          {/* Desktop: search */}
          <div className="hidden lg:flex items-center gap-2 border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5">
            <Search size={12} className="text-[var(--text-dim)]" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-xs font-mono text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none w-36"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <div className="flex items-center gap-1">
            {/* If user has overridden the system theme, show a reset option */}
            {!isSystemDefault && (
              <button
                onClick={resetToSystem}
                title="Reset to system theme"
                className="text-[var(--text-dim)] hover:text-[var(--amber)] transition-colors p-1.5 font-mono text-xs"
              >
                Auto
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="text-[var(--text-dim)] hover:text-[var(--amber)] transition-colors p-1.5"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={
                isSystemDefault ? "Following system theme" : `${theme} mode`
              }
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* User avatar — desktop */}
          <div className="hidden md:flex items-center gap-2 border-l border-[var(--border)] pl-3">
            <div className="w-7 h-7 bg-[var(--amber-bg)] border border-[var(--amber-border)] flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-[var(--amber)]">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </span>
            </div>
            <span className="hidden lg:block font-mono text-xs text-[var(--text-muted)]">
              {user?.username}
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[var(--text-muted)] hover:text-[var(--text)] transition-colors p-1.5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ─────────────────────────────────────────── */}
      {mobileMenuOpen && <NavLinks setMobileMenuOpen={setMobileMenuOpen} />}
    </>
  );
}
