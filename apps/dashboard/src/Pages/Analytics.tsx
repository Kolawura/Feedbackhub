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
import { StartCardDiv } from "../Components/Dashboard/StartCardDiv";

export function Analytics() {
  const { user } = useAuthStore();

  return (
    <div className="p-6 transition-all duration-200">
      <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
        Analytics
      </h1>
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-white mb-6">
        Welcome back, {user?.username} 👋
      </h2>
      <StartCardDiv />
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
