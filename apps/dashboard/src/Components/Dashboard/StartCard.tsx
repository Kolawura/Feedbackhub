import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp } from "../../utils/fadeUp";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

const StatCard = ({
  s,
  i,
  isLoading,
}: {
  s: StatCardProps;
  i: number;
  isLoading: boolean;
}) => {
  return (
    <motion.div key={s.label} {...fadeUp(0.05 + i * 0.05)}>
      <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-4 md:p-5 hover:border-[var(--border-light)] transition-colors group">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest leading-tight">
            {s.label}
          </span>
          <span
            style={{ color: s.color }}
            className="opacity-40 group-hover:opacity-90 transition-opacity"
          >
            {s.icon}
          </span>
        </div>
        <p
          className="font-display text-2xl md:text-3xl font-bold"
          style={{ color: s.color }}
        >
          {isLoading ? (
            <span className="inline-block w-8 h-7 bg-[var(--bg-hover)] animate-pulse rounded-sm" />
          ) : (
            s.value
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
