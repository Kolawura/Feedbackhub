import { motion } from "framer-motion";

type EmptyStateProps = {
  message?: string;
  variant?: "default" | "feedback" | "analytics" | "error";
};

const icons = {
  default: (
    // Bars icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 15a4 4 0 014-4h14M3 9a4 4 0 014-4h14M3 21a4 4 0 014-4h14"
      />
    </svg>
  ),
  feedback: (
    // Chat bubble
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 text-blue-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 8h10M7 12h5m-9 8l3-3h11a4 4 0 004-4V6a4 4 0 00-4-4H6a4 4 0 00-4 4v10a4 4 0 004 4z"
      />
    </svg>
  ),
  analytics: (
    // Chart line icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 text-green-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 17l6-6 4 4 8-8"
      />
    </svg>
  ),
  error: (
    // Error / Warning icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12 text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a1.5 1.5 0 001.29 2.25h18.78a1.5 1.5 0 001.29-2.25L13.71 3.86a1.5 1.5 0 00-2.42 0z"
      />
    </svg>
  ),
};

const defaultMessages = {
  default: "No data available",
  feedback: "No feedback available",
  analytics: "No analytics data",
  error: "Something went wrong",
};

export const EmptyState = ({
  message,
  variant = "default",
}: EmptyStateProps) => {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center gap-3 text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {icons[variant]}
      <p className="text-sm font-medium">
        {message || defaultMessages[variant]}
      </p>
    </motion.div>
  );
};
