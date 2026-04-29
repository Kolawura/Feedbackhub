import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForgetPassword } from "../Hooks/useForgetPassword";

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { email, setEmail, sent, loading, handleSubmit } = useForgetPassword();

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 font-serif">
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="mb-10 text-center">
          <span className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase">
            ◆ FeedbackHub
          </span>
        </div>

        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8">
          {!sent ? (
            <>
              <div className="mb-6">
                <h1 className="font-display text-2xl font-bold text-[var(--text)] mb-1">
                  Forgot password?
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                  Enter your email and we'll send a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm font-mono px-4 py-3 placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--amber)] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm py-3 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send reset link →"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-[var(--green-bg)] border border-[var(--green)]/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-[var(--green)] text-xl">✓</span>
              </div>
              <h2 className="font-display text-xl font-bold text-[var(--text)] mb-2">
                Check your inbox
              </h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                If <span className="text-[var(--text)]">{email}</span> is
                registered, you'll receive a reset link within a few minutes.
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs font-mono text-[var(--text-dim)]">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[var(--amber)] hover:opacity-80 transition-opacity"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
};
