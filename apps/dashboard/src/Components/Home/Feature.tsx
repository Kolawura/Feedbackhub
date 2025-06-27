import { ReactNode } from "react";

export const Feature = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode | string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col item-center justify-center bg-white dark:bg-white/3 rounded-xl p-6 text-center border border-gray-300 dark:border-gray-700 transition-colors">
      <div className="w-14 h-14 flex items-center justify-center text-4xl text-center mb-4 rounded-full mx-auto p-2 bg-gray-50 dark:bg-gray-900 ">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
};
