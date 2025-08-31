import type React from "react";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ThumbsUp,
  ThumbsDown,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import StatCard from "../Components/Dashboard/StartCard";
import { motion } from "framer-motion";
import { RecentFeedbackItem } from "../Components/Feedbacks/RecentFeedbackItem";
import { useNavigate } from "react-router-dom";
import { useFeedbackStore } from "../Store/useFeedbackStore";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { feedbacks, loading, error } = useFeedbackStore();
  const recentFeedback = feedbacks.slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "closed":
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6 text-gray-900 dark:text-gray-100 transition-all duration-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your feedback hub activity</p>
      </div>
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

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>
                Latest feedback submissions from users
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => navigate("/feedbacks")}>
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          {loading ? (
            <div>Loading feedbacks...</div>
          ) : feedbacks ? (
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <RecentFeedbackItem
                    key={feedback.id}
                    feedback={feedback}
                    getStatusIcon={getStatusIcon}
                    getPriorityColor={getPriorityColor}
                  />
                ))}
              </div>
            </CardContent>
          ) : (
            <div>{error}</div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
