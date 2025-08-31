import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ErrorPageProps {
  message?: string;
}

const NotFoundPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="text-center p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          {message || "Page Not Found"}
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 dark:bg-blue-500 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
