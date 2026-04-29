import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { useVerifyEmail } from "../Hooks/useVerifyEmail";
import { ResendButton } from "../Components/Verification/ResendButton";

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { status, message } = useVerifyEmail();

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
        className="relative z-10 w-full max-w-sm text-center"
      >
        <div className="mb-8">
          <span className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase">
            ◆ FeedbackHub
          </span>
        </div>

        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8">
          {status === "verifying" && (
            <>
              <div className="flex justify-center mb-4">
                <Loader
                  size={32}
                  className="text-[var(--amber)] animate-spin"
                />
              </div>
              <h1 className="font-display text-xl font-bold text-[var(--text)] mb-2">
                Verifying your email...
              </h1>
              <p className="text-sm text-[var(--text-muted)]">Just a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center mb-4">
                <CheckCircle size={40} className="text-[var(--green)]" />
              </div>
              <h1 className="font-display text-xl font-bold text-[var(--text)] mb-2">
                Email verified!
              </h1>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Your email has been verified. You can now use all features.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-[var(--amber)] text-[#0e0e0f] font-mono text-xs font-medium py-3 hover:opacity-90 transition-opacity"
              >
                Go to dashboard →
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center mb-4">
                <XCircle size={40} className="text-[var(--red)]" />
              </div>
              <h1 className="font-display text-xl font-bold text-[var(--text)] mb-2">
                Verification failed
              </h1>
              <p className="text-sm text-[var(--text-muted)] mb-6">{message}</p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-[var(--amber)] text-[#0e0e0f] font-mono text-xs font-medium py-3 hover:opacity-90 transition-opacity"
                >
                  Back to sign in
                </button>
                <ResendButton />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
