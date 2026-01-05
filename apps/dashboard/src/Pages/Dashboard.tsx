import type React from "react";
import { Clock, CheckCircle, AlertCircle, ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/Card";
import { Button } from "../Components/ui/Button";
import { motion } from "framer-motion";
import { RecentFeedbackItem } from "../Components/Feedbacks/RecentFeedbackItem";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/ui/Loader";
import { EmptyState } from "../Components/ui/EmptyState";
import { StartCardDiv } from "../Components/Dashboard/StartCardDiv";
import { useAuth } from "../Hooks/useAuth";
import { useFeedbacks } from "../Hooks/useFeedback";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: feedbacks, isLoading, error } = useFeedbacks();
  const { user } = useAuth();
  const recentFeedback = feedbacks?.slice(0, 5);

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
        <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-white mb-4">
          Welcome back, {user?.username} 👋
        </h2>
        <p className="text-gray-600">Overview of your feedback hub activity</p>
      </div>
      <StartCardDiv />
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {feedbacks?.length === 0 ? (
          <EmptyState message="No feedback data available" variant="feedback" />
        ) : isLoading ? (
          <Loader message="Loading feedbacks..." />
        ) : (
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
            {feedbacks ? (
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback?.map((feedback) => (
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
              <div>{error?.message}</div>
            )}
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
