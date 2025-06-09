import { motion } from "framer-motion";
import { ArrowRight, EllipsisVertical } from "lucide-react";

type TopCardProps = {
  type: "Channels" | "Source";
};

const TopChannel = ({ type }: TopCardProps) => {
  const channels = [
    { name: "Google", visitors: "4.7K" },
    { name: "Facebook", visitors: "3.4K" },
    { name: "Threads", visitors: "2.9K" },
    { name: "Google", visitors: "1.5K" },
  ];
  let title: string = "";
  let source: string = "";

  if (type === "Channels") {
    title = "Top Channels";
    source = "Visitors";
  } else if (type === "Source") {
    title = "Top pages";
    source = "Pageview";
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-white/3 shadow-md rounded-xl p-5 w-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <span className="sr-only">More options</span>
          <EllipsisVertical strokeWidth={0.5} />
        </button>
      </div>
      <div className="flex justify-between px-1 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <span>Source</span>
        <span>{source}</span>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {channels.map((channel, idx) => (
          <div
            key={idx}
            className="flex justify-between py-3 text-sm text-gray-800 dark:text-gray-200"
          >
            <span>{channel.name}</span>
            <span className="font-medium">{channel.visitors}</span>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full flex justify-center items-center px-4 py-2 text-sm border rounded-lg border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        Channels Report
        <ArrowRight className="w-10 h-4" />
      </button>
    </motion.div>
  );
};

export default TopChannel;
