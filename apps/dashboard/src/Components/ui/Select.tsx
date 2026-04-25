import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { links } from "../Bars/NavLinks";
import { ChevronDown } from "lucide-react";

export const Select = ({
  placeholder = "Select page",
}: {
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof links)[0] | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  // Sync with route
  useEffect(() => {
    const match = links.find((link) => location.pathname.startsWith(link.path));
    setSelected(match || null);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (link: (typeof links)[0]) => {
    setSelected(link);
    setOpen(false);
    navigate(link.path);
  };

  return (
    <div ref={ref} className="relative w-48 text-xs font-mono">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 bg-[var(--bg)] border border-[var(--border)] focus:outline-none focus:border-[var(--amber)] text-[var(--text)] hover:border-[var(--amber)] transition-colors"
      >
        <span className="flex items-center gap-2">
          {selected?.icon}
          {selected?.name || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-[var(--bg)] border border-[var(--border)]  shadow-lg z-50">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => handleSelect(link)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[var(--border)] transition-colors ${
                selected?.path === link.path
                  ? "text-[var(--amber)]"
                  : "text-[var(--text)]"
              }`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
