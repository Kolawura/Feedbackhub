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

export default function DashboardPage() {
  return (
    <div className="p-6 transition-all duration-200">
      <h1 className="text-3xl text-center font-bold text-gray-800 dark:text-white">
        Analytics
      </h1>
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-white mb-6">
        Welcome back, Adekola 👋
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Feedback"
          value={128}
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
          value={36}
          icon={<ThumbsDown size={20} />}
          color="bg-red-500/15 text-red-500"
        />
        <StatCard
          title="Sites Connected"
          value={4}
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
