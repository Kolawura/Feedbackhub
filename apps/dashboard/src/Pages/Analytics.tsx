import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Globe,
  MessageSquare,
} from "lucide-react";
import StatCard from "../Components/Dashboard/StartCard";
import { DashboardAnalytics } from "../Components/Dashboard/DashboardAnalytics";
import RecentFeedback from "../Components/Feedbacks/RecentFeedbacks";
import VisitorAnalytics from "../Components/Analytics/VisitorsAnalytics";
import TopChannel from "../Components/Dashboard/TopChannel";
import { useAuthStore } from "../Store/useAuthStore";
import { useFeedbackStore } from "../Store/useFeedbackStore";
import { useSiteIdStore } from "../Store/useSiteIdStore";

export function Analytics() {
  const { user } = useAuthStore();
  const { feedbacks } = useFeedbackStore();
  const { siteIds } = useSiteIdStore();

  return (
    <div className="p-6 transition-all duration-200">
      <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
        Analytics
      </h1>
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-white mb-6">
        Welcome back, {user?.username} 👋
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Feedback"
          value={feedbacks.length}
          icon={<MessageSquare size={20} />}
          color="bg-blue-500/15 text-blue-500"
        />
        <StatCard
          title="Positive Feedback"
          value={92}
          icon={<ThumbsUp size={20} />}
          color="bg-green-500/15 text-green-500"
        />
        <StatCard
          title="Negative Feedback"
          value={siteIds.length}
          icon={<ThumbsDown size={20} />}
          color="bg-red-500/15 text-red-500"
        />
        <StatCard
          title="Sites Connected"
          value={user?.adminSite.length || 0}
          icon={<Globe size={20} />}
          color="bg-purple-500/15 text-purple-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full flex justify-center items-center lg:w-auto">
          <TopChannel type="Channels" />
        </div>
        <div className="w-full flex justify-center items-center lg:w-auto">
          <TopChannel type="Source" />
        </div>
      </div>
      <DashboardAnalytics />
      <VisitorAnalytics />
      <RecentFeedback />
    </div>
  );
}
