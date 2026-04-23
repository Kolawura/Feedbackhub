import { Save } from "lucide-react";

export const SectionHeader = ({
  title,
  sub,
}: {
  title: string;
  sub?: string;
}) => (
  <div className="mb-6">
    <h2 className="font-display text-lg font-semibold text-[var(--text)]">
      {title}
    </h2>
    {sub && <p className="text-xs text-[var(--text-muted)] mt-0.5">{sub}</p>}
  </div>
);

export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5 md:p-6">
    {children}
  </div>
);

export const SaveButton = ({
  loading,
  label = "Save changes",
}: {
  loading?: boolean;
  label?: string;
}) => (
  <button
    type="submit"
    disabled={loading}
    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--amber)] text-[#0e0e0f] font-mono text-xs font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
  >
    {loading ? (
      <span className="w-3.5 h-3.5 border border-[#0e0e0f] border-t-transparent rounded-full animate-spin" />
    ) : (
      <Save size={13} />
    )}
    {loading ? "Saving..." : label}
  </button>
);
