import { motion } from "framer-motion";

const LoadingPage = ({ message = "Loading..." }: { message?: string }) => (
  <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-4">
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 bg-[var(--amber)] rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
    <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
      {message}
    </p>
  </div>
);

export default LoadingPage;
