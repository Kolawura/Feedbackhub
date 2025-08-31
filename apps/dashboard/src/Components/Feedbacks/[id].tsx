import { useParams } from "react-router-dom";
import FeedbackNotFound from "./FeedBackNotFound";
import { useFeedbackStore } from "../../Store/useFeedbackStore";
import { Feedback } from "../../Type";
import LoadingPage from "../../Pages/LoadingPage";
import ErrorPage from "../../Pages/ErrorPage";

export default function FeedbackDetail() {
  const { feedbacks, loading, error } = useFeedbackStore();
  const { id } = useParams();
  const feedback: Feedback | undefined = feedbacks.find((f) => f.id === id);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error} />;
  if (!feedback) return <FeedbackNotFound />;

  return (
    <div className="bg-white dark:bg-white/3 shadow-md rounded-xl p-6 border border-gray-300 dark:border-gray-700">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {feedback.title}
      </h2>

      {/* Sender Info */}
      <div className="flex items-center gap-3 mb-4">
        {feedback.sender.avatar && (
          <img
            src={feedback.sender.avatar}
            alt={feedback.sender.name}
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
          />
        )}
        <div>
          <p className="text-gray-900 dark:text-white font-semibold">
            {feedback.sender.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {feedback.sender.email}
          </p>
        </div>
      </div>

      {/* Feedback Description */}
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {feedback.description}
      </p>

      {/* Meta Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Category</p>
          <p className="text-gray-900 dark:text-white font-medium">
            {feedback.category}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Priority</p>
          <p className="text-gray-900 dark:text-white font-medium capitalize">
            {feedback.priority}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Status</p>
          <p className="text-gray-900 dark:text-white font-medium capitalize">
            {feedback.status}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Votes</p>
          <p className="text-gray-900 dark:text-white font-medium">
            {feedback.votes}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Created</p>
          <p className="text-gray-900 dark:text-white font-medium">
            {new Date(feedback.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Updated</p>
          <p className="text-gray-900 dark:text-white font-medium">
            {new Date(feedback.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tags */}
      {feedback.tags.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {feedback.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
