export const MetaRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[var(--border)] last:border-0">
      <span className="text-[var(--text-dim)] mt-0.5 flex-shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p className="font-mono text-xs text-[var(--text)] break-all">
          {value}
        </p>
      </div>
    </div>
  );
};
