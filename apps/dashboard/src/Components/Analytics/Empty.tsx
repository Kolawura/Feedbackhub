export const Empty = ({ msg = "No data" }: { msg?: string }) => (
  <div className="flex items-center justify-center h-full py-8">
    <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest text-center">
      {msg}
    </p>
  </div>
);
