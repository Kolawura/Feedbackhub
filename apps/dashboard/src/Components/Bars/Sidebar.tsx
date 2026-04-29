import {
  ChartNoAxesCombined,
  Code2,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SidebarProps } from "../../Type";
import { useAuth } from "../../Hooks/useAuth";

const Sidebar = ({ Expand }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const links = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={18} />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Feedbacks",
      path: "/feedbacks",
      icon: <MessageSquare size={18} />,
    },
    { name: "Visitors", path: "/visitors", icon: <Users size={18} /> },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <ChartNoAxesCombined size={18} />,
    },
    {
      name: "WidgetSetUp",
      path: "/setup",
      icon: <Code2 size={18} />,
    },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    // Hidden on mobile (< md). On md+ always visible, width controlled by Expand.
    <aside
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      style={{ width: Expand ? "224px" : "64px" }}
      className="hidden md:flex flex-col fixed top-0 left-0 h-screen z-40 transition-all duration-200 overflow-hidden bg-[var(--bg-surface)] border-r border-[var(--border)]"
    >
      {/* Logo */}
      <div
        className={`flex ${Expand ? "justify-start" : "justify-center"} items-center h-14 px-4 border-b border-[var(--border)] flex-shrink-0`}
      >
        <span className="text-[var(--amber)] font-mono text-sm flex-shrink-0">
          ◆
        </span>
        {Expand && (
          <span className="ml-3 font-display font-bold text-[var(--text)] text-sm tracking-wide whitespace-nowrap">
            FeedbackHub
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-hidden">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              aria-label={link.name}
              title={!Expand ? link.name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-150 group border-l-2 whitespace-nowrap ${
                isActive
                  ? "bg-[var(--amber-bg)] text-[var(--amber)] border-[var(--amber)]"
                  : "text-[var(--text-dim)] hover:text-[var(--text-muted)] hover:bg-[var(--bg-hover)] border-transparent"
              }`}
            >
              <span
                className={`flex-shrink-0 ${isActive ? "text-[var(--amber)]" : "text-[var(--text-dim)] group-hover:text-[var(--text-muted)]"}`}
              >
                {link.icon}
              </span>
              {Expand && <span className="overflow-hidden">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-[var(--border)] p-3 flex-shrink-0">
        <div
          className={`flex items-center gap-3 mb-2 ${!Expand ? "justify-center" : ""}`}
        >
          <div className="w-8 h-8 bg-[var(--amber-bg)] border border-[var(--amber-border)] flex items-center justify-center flex-shrink-0">
            <span className="font-mono text-xs font-bold text-[var(--amber)]">
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </span>
          </div>
          {Expand && (
            <div className="min-w-0">
              <p className="text-xs font-mono text-[var(--text)] truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs font-mono text-[var(--text-dim)] truncate">
                @{user?.username}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => logout()}
          title={!Expand ? "Logout" : undefined}
          className={`flex items-center gap-2 w-full px-3 py-2 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--red)] hover:bg-[var(--red-bg)] transition-colors ${!Expand ? "justify-center" : ""}`}
        >
          <LogOut size={14} className="flex-shrink-0" />
          {Expand && (
            <span className="uppercase tracking-widest whitespace-nowrap">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
