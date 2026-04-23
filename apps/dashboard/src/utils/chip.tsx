export const Chip = ({ label, cls }: { label: string; cls: string }) => (
  <span className={`font-mono text-xs px-2.5 py-1 border ${cls}`}>{label}</span>
);
