import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

interface NotFoundPageProps {
  message?: string;
}

const NotFoundPage = ({ message }: NotFoundPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 font-serif overflow-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Big 404 background text */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-display font-bold text-[20vw] leading-none"
          style={{ color: "var(--amber)", opacity: 0.04 }}
        >
          404
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-md w-full"
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-4"
        >
          ◆ 404
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-5xl font-bold text-[var(--text)] mb-4 leading-tight"
        >
          Page not found.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed"
        >
          {message ||
            "The page you're looking for doesn't exist or has been moved."}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-2 justify-center"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--amber)] text-[#0e0e0f] font-mono text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <Home size={13} />
            Go home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text-muted)] font-mono text-xs hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
          >
            <ArrowLeft size={13} />
            Go back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
