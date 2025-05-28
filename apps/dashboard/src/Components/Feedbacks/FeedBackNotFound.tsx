import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function FeedbackNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4 border rounded-lg border-gray-200 dark:border-gray-800">
      <AlertTriangle className="h-16 w-16 text-red-600 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Feedback Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        We couldn't find the feedback you're looking for. It might have been
        removed or the link is incorrect.
      </p>
      <Link
        to="/feedback"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Feedback List
      </Link>
    </div>
  );
}
