export const Tile = ({
  label,
  value,
  colorVar = "var(--amber)",
  sub,
  icon,
}: {
  label: string;
  value: string | number;
  colorVar?: string;
  sub?: string;
  icon?: React.ReactNode;
}) => (
  <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-4 md:p-5 hover:border-[var(--border-light)] transition-colors group">
    <div className="flex items-center justify-between mb-2">
      <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest leading-tight">
        {label}
      </p>
      {icon && (
        <span
          className="opacity-40 group-hover:opacity-90 transition-opacity"
          style={{ color: colorVar }}
        >
          {icon}
        </span>
      )}
    </div>
    <p
      className="font-display text-2xl md:text-3xl font-bold"
      style={{ color: colorVar }}
    >
      {value}
    </p>
    {sub && (
      <p className="font-mono text-xs text-[var(--text-dim)] mt-1">{sub}</p>
    )}
  </div>
);
