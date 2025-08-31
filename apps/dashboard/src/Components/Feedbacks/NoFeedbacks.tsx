const NoFeedbacks = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.8-3.6A7.964 7.964 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <h2 className="text-lg font-semibold">No feedback yet</h2>
      <p className="mt-2 text-sm">
        Feedback from your users will appear here once they start submitting.
      </p>
    </div>
  );
};

export default NoFeedbacks;
