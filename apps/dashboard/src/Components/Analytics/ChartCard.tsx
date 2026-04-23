export const ChartCard = ({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) => (
  <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
    <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-0.5">
      {title}
    </p>
    {sub && <p className="text-xs text-[var(--text-muted)] mb-4">{sub}</p>}
    {!sub && <div className="mb-4" />}
    {children}
  </div>
);
