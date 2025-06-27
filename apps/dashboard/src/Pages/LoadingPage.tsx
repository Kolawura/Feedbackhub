import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-colors duration-200 text-black dark:text-white">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
        >
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin drop-shadow-lg" />
        </motion.div>
        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-gray-100">
          Loading...
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please wait while we prepare your experience
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
