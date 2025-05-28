import React from "react";
import { Link } from "react-router-dom";

const dummyFeedback = [
  { id: "1", name: "Ayo", title: "UI Issue", feedback: "Button is broken" },
  { id: "2", name: "Tolu", title: "Performance", feedback: "Page is slow" },
];

const RecentFeedback = () => {
  return (
    <div className="bg-white dark:bg-white/3 shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-100">
        Recent Feedback
      </h2>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="text-left text-gray-600 dark:text-gray-300">
            <th className="py-2">Name</th>
            <th className="py-2">Title</th>
            <th className="py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {dummyFeedback.map((fb) => (
            <tr
              key={fb.id}
              className="border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
            >
              <td className="py-2">{fb.name}</td>
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
    </div>
  );
};

export default RecentFeedback;
