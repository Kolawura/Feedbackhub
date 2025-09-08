import { Link } from "react-router-dom";
import { useFeedbackStore } from "../../Store/useFeedbackStore";
import { useEffect } from "react";
import { Feedback } from "../../Type";
import Loader from "../ui/Loader";
import { EmptyState } from "../ui/EmptyState";
import { fetchFeedbacks } from "../../Hooks/useFetch";

const RecentFeedback = () => {
  const { feedbacks, loading } = useFeedbackStore();
  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const recentFeedbacks: Feedback[] = feedbacks.slice(0, 3);
  return (
    <div className="bg-white dark:bg-white/3 shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-100">
        Recent Feedback
      </h2>
      {loading ? (
        <Loader />
      ) : feedbacks.length === 0 ? (
        <EmptyState
          message="No Feedback message Available"
          variant="feedback"
        />
      ) : (
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300">
              <th className="py-2">Name</th>
              <th className="py-2">Title</th>
              <th className="py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {recentFeedbacks.map((fb) => (
              <tr
                key={fb.id}
                className="border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
              >
                <td className="py-2">{fb.sender.name}</td>
                <td className="py-2">{fb.title}</td>
                <td className="py-2">
                  <Link
                    to={`/feedback/${fb.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentFeedback;
