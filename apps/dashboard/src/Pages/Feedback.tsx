// pages/feedback/index.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Feedback {
  id: string;
  name: string;
  title: string;
  feedback: string;
  date: string;
}

const dummyFeedbacks: Feedback[] = [
  {
    id: "1",
    name: "John Doe",
    title: "Feature Request",
    feedback: "I would love a dark mode toggle.",
    date: "2023-10-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    title: "Bug Report",
    feedback: "The modal doesn't close on ESC key.",
    date: "2023-10-01",
  },
  {
    id: "3",
    name: "Emily Johnson",
    title: "Appreciation",
    feedback: "Great work on the recent update!",
    date: "2023-10-01",
  },
];

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFeedbacks(dummyFeedbacks);
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-white/3 w-full h-full rounded-lg border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        Feedbacks
      </h2>
      <div className="bg-white dark:bg-white/3 rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th className="text-left py-3 px-6">Name</th>
              <th className="text-left py-3 px-6">Title</th>
              <th className="text-left py-3 px-6">Feedback</th>
              <th className="text-left py-3 px-6">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr
                key={fb.id}
                onClick={() => navigate(`/feedback/${fb.id}`)}
                className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-3 px-6">{fb.name}</td>
                <td className="py-3 px-6">{fb.title}</td>
                <td className="py-3 px-6">
                  {fb.feedback.length > 50
                    ? `${fb.feedback.slice(0, 50)}...`
                    : fb.feedback}
                </td>
                <td className="py-3 px-6 truncate max-w-xs">{fb.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
