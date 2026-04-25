import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";
import { useThemeStore } from "../../Store/useThemeStore";
import { links, NavLinks } from "./NavLinks";
import { Select } from "../ui/Select";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, isSystemDefault, toggleTheme, resetToSystem } =
    useThemeStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase font-bold"
        >
          ◆ FeedbackHub
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <div className="flex items-center gap-3">
              <Select placeholder="Navigate to..." />
              <div className="flex items-center gap-2">
                {/* Theme toggle */}
                <div className="flex items-center gap-1">
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
                      isSystemDefault
                        ? "Following system theme"
                        : `${theme} mode`
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
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 transition-colors uppercase tracking-widest"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="font-mono text-xs bg-[var(--amber)] text-[#0e0e0f] font-medium px-4 py-2 hover:opacity-90 transition-opacity uppercase tracking-widest"
              >
                Get started
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme toggle */}
          <div className="flex items-center gap-1">
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
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {isOpen && <NavLinks setMobileMenuOpen={setIsOpen} isHomeNavbar={true} />}
    </nav>
  );
};

export default HomeNavbar;
