import React from "react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-colors duration-200 text-black dark:text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg rounded-2xl shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {errorMessage || "An unexpected error occurred. Please try again."}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
          >
            Go Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-red-500 px-6 py-2 text-white font-medium shadow hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
