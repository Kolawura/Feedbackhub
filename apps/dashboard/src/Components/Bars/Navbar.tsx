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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NavbarProps } from "../../Type";
import { useThemeStore } from "../../Store/useThemeStore";
import { useAuth } from "../../Hooks/useAuth";

export default function Navbar({
  isCollapsed,
  setIsCollapsed,
  className,
  NavWidth,
}: NavbarProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      name: "Feedbacks",
      path: "/feedbacks",
      icon: <MessageSquare size={16} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <ChartNoAxesCombined size={16} />,
    },
    { name: "Settings", path: "/settings", icon: <Settings size={16} /> },
  ];

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
          <span className="md:hidden font-mono text-xs text-[var(--amber)] tracking-[0.2em] uppercase font-bold">
            ◆ FeedbackHub
          </span>

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
          <button
            onClick={toggleTheme}
            className="text-[var(--text-dim)] hover:text-[var(--amber)] transition-colors p-1.5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed top-14 left-0 right-0 z-20 bg-[var(--bg-surface)] border-b border-[var(--border)] shadow-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
            <div className="w-8 h-8 bg-[var(--amber-bg)] border border-[var(--amber-border)] flex items-center justify-center flex-shrink-0">
              <span className="font-mono text-xs font-bold text-[var(--amber)]">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--text)]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="font-mono text-xs text-[var(--text-dim)]">
                @{user?.username}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="py-2">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-[var(--amber)] bg-[var(--amber-bg)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]"
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-[var(--border)] py-2">
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 w-full px-5 py-3 font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--red)] hover:bg-[var(--red-bg)] transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
