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
import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/Avatar";
import { Badge } from "../Components/ui/Badge";
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

const mockFeedback = [
  {
    id: "1",
    title: "Login page is too slow",
    description:
      "The login page takes more than 5 seconds to load, which is frustrating for users.",
    category: "bug",
    priority: "high",
    status: "open",
    sender: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    votes: 12,
    tags: ["performance", "login"],
  },
  {
    id: "2",
    title: "Add dark mode support",
    description:
      "It would be great to have a dark mode option for better user experience during night time.",
    category: "feature",
    priority: "medium",
    status: "in-progress",
    sender: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
    votes: 8,
    tags: ["ui", "accessibility"],
  },
];

const RecentFeedbackItem: React.FC<{
  feedback: any;
  getStatusIcon: (status: string) => React.ReactNode;
  getPriorityColor: (priority: string) => string;
}> = ({ feedback, getStatusIcon, getPriorityColor }) => (
  <div className="flex items-start space-x-4 p-4 border rounded-lg border-gray-300 dark:border-gray-700">
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{feedback.title}</h4>
        <div className="flex items-center space-x-2">
          {getStatusIcon(feedback.status)}
          <Badge variant={getPriorityColor(feedback.priority) as any}>
            {feedback.priority}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {feedback.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>by {feedback.sender.name}</span>
        <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<{ onNavigate?: (page: string) => void }> = ({
  onNavigate,
}) => {
  const recentFeedback = mockFeedback.slice(0, 5);

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
            <Button
              variant="outline"
              onClick={() => onNavigate && onNavigate("/feedbacks")}
            >
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
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
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
