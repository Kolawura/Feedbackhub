export const Tile = ({
  label,
  value,
  colorVar = "var(--amber)",
  sub,
}: {
  label: string;
  value: string | number;
  colorVar?: string;
  sub?: string;
}) => (
  <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-4 md:p-5 hover:border-[var(--border-light)] transition-colors">
    <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-2 leading-tight">
      {label}
    </p>
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
