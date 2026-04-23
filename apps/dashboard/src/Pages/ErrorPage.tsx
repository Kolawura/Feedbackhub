import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, RotateCcw, ArrowLeft, Home } from "lucide-react";

interface ErrorPageProps {
  errorMessage?: string;
}

const ErrorPage = ({ errorMessage }: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 font-serif">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--red) 1px, transparent 1px), linear-gradient(90deg, var(--red) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-md w-full"
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--red-bg)] border border-[var(--red)]/30 mb-6">
          <AlertTriangle size={28} className="text-[var(--red)]" />
        </div>

        {/* Label */}
        <p className="font-mono text-xs text-[var(--red)] tracking-[0.3em] uppercase mb-3">
          Something went wrong
        </p>

        {/* Heading */}
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--text)] mb-4 leading-tight">
          Unexpected error
        </h1>

        {/* Error message */}
        {errorMessage && (
          <div className="border border-[var(--red)]/20 bg-[var(--red-bg)] px-4 py-3 mb-6 text-left">
            <p className="font-mono text-xs text-[var(--red)] break-words">
              {errorMessage}
            </p>
          </div>
        )}

        {!errorMessage && (
          <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
            An unexpected error occurred. You can try again, go back, or return
            home.
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--red)] text-white font-mono text-xs hover:opacity-90 transition-opacity"
          >
            <RotateCcw size={13} />
            Retry
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--border)] text-[var(--text-muted)] font-mono text-xs hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
          >
            <ArrowLeft size={13} />
            Go back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--border)] text-[var(--text-muted)] font-mono text-xs hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
          >
            <Home size={13} />
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
