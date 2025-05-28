import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  color = "bg-blue-500",
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white dark:bg-white/3 rounded-xl shadow-md p-6 flex items-center gap-4 transition hover:shadow-lg border border-gray-300 dark:border-gray-700"
    >
      <div
        className={`w-12 h-12 flex items-center justify-center text-white rounded-full ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{title}</p>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {value}
        </h3>
      </div>
    </motion.div>
  );
};

export default StatCard;
