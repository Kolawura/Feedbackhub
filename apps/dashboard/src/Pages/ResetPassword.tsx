import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useResetPassword } from "../Hooks/useResetPassword";

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    password,
    setPassword,
    confirm,
    setConfirm,
    showPass,
    setShowPass,
    showConfirm,
    setShowConfirm,
    loading,
    done,
    error,
    handleSubmit,
  } = useResetPassword();

  const inputClass =
    "w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] text-sm font-mono px-4 py-3 placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--amber)] transition-colors";
  const labelClass =
    "block font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2";

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
          {!done ? (
            <>
              <div className="mb-6">
                <h1 className="font-display text-2xl font-bold text-[var(--text)] mb-1">
                  Set new password
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                  Choose a strong password for your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>New password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors"
                    >
                      {showPass ? (
                        <EyeOffIcon size={16} />
                      ) : (
                        <EyeIcon size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Confirm password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat password"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-muted)] transition-colors"
                    >
                      {showConfirm ? (
                        <EyeOffIcon size={16} />
                      ) : (
                        <EyeIcon size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="border border-[var(--red)]/30 bg-[var(--red-bg)] px-4 py-3">
                    <p className="text-xs font-mono text-[var(--red)]">
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm py-3 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Save new password →"
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
                Password updated!
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Your password has been changed. Please sign in with your new
                password.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-[var(--amber)] text-[#0e0e0f] font-mono font-medium text-sm py-3 hover:opacity-90 transition-opacity"
              >
                Sign in →
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
