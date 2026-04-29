import {
  Home,
  LayoutDashboard,
  MessageSquare,
  ChartNoAxesCombined,
  Code2,
  Settings,
  LogOut,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export const links = [
  {
    name: "Home",
    path: "/",
    icon: <Home size={18} />,
  },
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
  { name: "Visitors", path: "/visitors", icon: <Users size={16} /> },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <ChartNoAxesCombined size={16} />,
  },
  {
    name: "WidgetSetUp",
    path: "/setup",
    icon: <Code2 size={18} />,
  },
  { name: "Settings", path: "/settings", icon: <Settings size={16} /> },
];

export const NavLinks = ({
  setMobileMenuOpen,
  isHomeNavbar = false,
}: {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHomeNavbar?: boolean;
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div
      className={`${isHomeNavbar ? "" : "md:hidden"} border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 space-y-1`}
    >
      {user ? (
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
      ) : (
        <>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] py-2 uppercase tracking-widest"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-mono text-xs text-[var(--amber)] py-2 uppercase tracking-widest"
          >
            Get started →
          </Link>
        </>
      )}
    </div>
  );
};
