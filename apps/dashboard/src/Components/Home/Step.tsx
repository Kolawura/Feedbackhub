export const Step = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="text-center space-y-4 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-300 dark:border-gray-700 transition-colors">
      <div className="w-14 h-14 bg-white dark:bg-white/3 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
        {number}
      </div>
      <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
};
