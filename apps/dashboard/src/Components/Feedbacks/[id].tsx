// pages/feedback/[id].tsx

import { useParams } from "react-router-dom";
import FeedbackNotFound from "./FeedBackNotFound";

const dummyFeedbacks = {
  "1": {
    name: "John Doe",
    title: "Feature Request",
    feedback: "I would love a dark mode toggle.",
  },
  "2": {
    name: "Jane Smith",
    title: "Bug Report",
    feedback: "The modal doesn't close on ESC key.",
  },
  "3": {
    name: "Emily Johnson",
    title: "Appreciation",
    feedback: "Great work on the recent update!",
  },
};

export default function FeedbackDetail() {
  const { id } = useParams();
  const feedback = dummyFeedbacks[id as keyof typeof dummyFeedbacks];

  if (!feedback) {
    return <FeedbackNotFound />;
  }

  return (
    <div className="bg-white dark:bg-white/3 shadow-md rounded-xl p-6 border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {feedback.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>From:</strong> {feedback.name}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <strong>Feedback:</strong> {feedback.feedback}
      </p>
    </div>
  );
}
