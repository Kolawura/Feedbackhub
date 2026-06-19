// src/Components/ui/EmailVerificationBanner.tsx
import { MailWarning, X, Send } from "lucide-react";
import { useAuth } from "../../Hooks/useAuth";
import { useVerifyEmail } from "../../Hooks/useVerifyEmail";

export const EmailVerificationBanner = () => {
  const { user } = useAuth();
  const { resend, dismissed, setDismissed, sending } = useVerifyEmail();
  // Do n't render if verified, dismissed, or user not loaded
  if (!user || user.emailVerified || dismissed) return null;

  return (
    <div className="relative flex items-center gap-3 px-4 py-3 bg-[var(--amber-bg)] border-b border-[var(--amber-border)]">
      <MailWarning size={15} className="text-[var(--amber)] flex-shrink-0" />

      <p className="flex-1 font-mono text-xs text-[var(--amber)] leading-relaxed">
        Your email <span className="font-medium">{user.email}</span> is not
        verified.{" "}
        <button
          onClick={() => resend(user.email)}
          disabled={sending}
          className="underline underline-offset-2 hover:opacity-70 disabled:opacity-50 transition-opacity"
        >
          {sending ? "Sending…" : "Resend verification email"}
        </button>
      </p>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="text-[var(--amber)] hover:opacity-60 transition-opacity flex-shrink-0 p-0.5"
      >
        <X size={13} />
      </button>
    </div>
  );
};
