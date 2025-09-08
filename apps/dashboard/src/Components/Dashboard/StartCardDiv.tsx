import { MessageSquare, ThumbsUp, ThumbsDown, Globe } from "lucide-react";
import StatCard from "./StartCard";
import { useFeedbackStore } from "../../Store/useFeedbackStore";
import { useSetupStore } from "../../Store/useSetupStore";
import { useDashboardAnalyticsStore } from "../../Store/useDashboardAnalyticsStore";

export const StartCardDiv = () => {
  const { feedbacks } = useFeedbackStore();
  console.log("Store identity", useSetupStore);
  const sites = useSetupStore((state) => state.sites);
  const { analytics } = useDashboardAnalyticsStore();
  console.log("Current sites:", useSetupStore.getState().sites);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Feedback"
        value={feedbacks.length}
        icon={<MessageSquare size={20} />}
        color="bg-blue-500/15 text-blue-500"
      />
      <StatCard
        title="Positive Feedback"
        value={analytics?.positive || 0}
        icon={<ThumbsUp size={20} />}
        color="bg-green-500/15 text-green-500"
      />
      <StatCard
        title="Negative Feedback"
        value={analytics?.negative || 0}
        icon={<ThumbsDown size={20} />}
        color="bg-red-500/15 text-red-500"
      />
      <StatCard
        title="Sites Connected"
        value={sites.length}
        icon={<Globe size={20} />}
        color="bg-purple-500/15 text-purple-500"
      />
    </div>
  );
};
