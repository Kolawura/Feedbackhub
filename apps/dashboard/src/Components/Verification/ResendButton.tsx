import { useVerifyEmail } from "../../Hooks/useVerifyEmail";

export function ResendButton() {
  const {
    sent,
    showInput,
    setShowInput,
    email,
    setEmail,
    loading,
    handleResend,
  } = useVerifyEmail();

  if (sent) {
    return (
      <p className="text-xs font-mono text-[var(--green)] mt-2">
        If that email is registered, a new link has been sent.
      </p>
    );
  }

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="w-full border border-[var(--border)] text-[var(--text-muted)] font-mono text-xs py-3 hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
      >
        Resend verification email
      </button>
    );
  }

  return (
    <div className="space-y-2 mt-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] font-mono text-xs px-4 py-2.5 focus:outline-none focus:border-[var(--amber)] transition-colors"
      />
      <button
        onClick={handleResend}
        disabled={loading}
        className="w-full bg-[var(--bg-surface-2)] border border-[var(--border)] text-[var(--text-muted)] font-mono text-xs py-2.5 hover:text-[var(--text)] disabled:opacity-50 transition-colors"
      >
        {loading ? "Sending..." : "Send new link"}
      </button>
    </div>
  );
}
