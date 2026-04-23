import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";
import { api } from "../../lib/axios";
import { Card } from "../ui/Card";
import { labelClass, inputClass } from "../ui/styles";
import { SectionHeader } from "../ui/SettingsUi";

export const DangerTab = () => {
  const { logout } = useAuth();
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const CONFIRM_PHRASE = "delete my account";

  const handleDelete = async () => {
    if (confirmText !== CONFIRM_PHRASE) return;
    setLoading(true);
    try {
      await api.delete("/api/auth/account");
      toast.success("Account deleted");
      logout();
    } catch {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Sign out all sessions */}
      <Card>
        <SectionHeader title="Sign out" sub="Log out of your current session" />
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] text-[var(--text-muted)] font-mono text-xs hover:border-[var(--border-light)] hover:text-[var(--text)] transition-colors"
        >
          Sign out
        </button>
      </Card>

      {/* Delete account */}
      <Card>
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 bg-[var(--red-bg)] border border-[var(--red)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={14} className="text-[var(--red)]" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-[var(--red)]">
              Delete account
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              This permanently deletes your account, all sites, and all
              associated feedback. This cannot be undone.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <label className={labelClass}>
            Type <span className="text-[var(--red)]">{CONFIRM_PHRASE}</span> to
            confirm
          </label>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            className={inputClass}
          />
          <button
            onClick={handleDelete}
            disabled={confirmText !== CONFIRM_PHRASE || loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--red-bg)] text-[var(--red)] border border-[var(--red)]/30 font-mono text-xs hover:bg-[var(--red)] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={13} />
            )}
            {loading ? "Deleting..." : "Delete my account"}
          </button>
        </div>
      </Card>
    </div>
  );
};
