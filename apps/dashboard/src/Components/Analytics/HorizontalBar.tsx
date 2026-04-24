import { motion } from "framer-motion";

export const HBar = ({
  label,
  count,
  total,
  color = "var(--amber)",
}: {
  label: string;
  count: number;
  total: number;
  color?: string;
}) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-0">
      <span className="font-mono text-xs text-[var(--text-muted)] w-32 md:w-44 truncate flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-[var(--bg-hover)] overflow-hidden rounded-full">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      </div>
      <span className="font-mono text-xs text-[var(--text-dim)] w-7 text-right flex-shrink-0">
        {count}
      </span>
      <span className="font-mono text-xs text-[var(--text-dim)] w-9 text-right flex-shrink-0 hidden sm:block">
        {pct}%
      </span>
    </div>
  );
};
