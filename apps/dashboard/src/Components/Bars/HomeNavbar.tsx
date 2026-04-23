import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase font-bold"
        >
          ◆ FeedbackHub
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 transition-colors uppercase tracking-widest"
              >
                Dashboard
              </Link>
              <Link
                to="/setup"
                className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] px-3 py-2 transition-colors uppercase tracking-widest"
              >
                Setup
              </Link>
            </>
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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 space-y-1">
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] py-2 uppercase tracking-widest"
              >
                Dashboard
              </Link>
              <Link
                to="/setup"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] py-2 uppercase tracking-widest"
              >
                Setup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] py-2 uppercase tracking-widest"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block font-mono text-xs text-[var(--amber)] py-2 uppercase tracking-widest"
              >
                Get started →
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
