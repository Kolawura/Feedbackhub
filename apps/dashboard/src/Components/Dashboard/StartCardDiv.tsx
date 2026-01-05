import { MessageSquare, ThumbsUp, ThumbsDown, Globe } from "lucide-react";
import StatCard from "./StartCard";
import { useSiteStore } from "../../Store/useSiteStore";
import { useFeedbacks } from "../../Hooks/useFeedback";
import { useSites } from "../../Hooks/useSite";
import { useDashboardAnalytics } from "../../Hooks/useAnalytics";

export const StartCardDiv = () => {
  const { data: feedbacks } = useFeedbacks();
  const { sitesQuery: sites } = useSites();
  const { selectedSiteId } = useSiteStore();
  const { data: analytics } = useDashboardAnalytics(selectedSiteId);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Feedback"
        value={feedbacks?.length || 0}
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
        value={sites?.data?.length || 0}
        icon={<Globe size={20} />}
        color="bg-purple-500/15 text-purple-500"
      />
    </div>
  );
};
