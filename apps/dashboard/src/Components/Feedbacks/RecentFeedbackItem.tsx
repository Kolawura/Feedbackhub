import { Badge } from "../ui/Badge";

export const RecentFeedbackItem: React.FC<{
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
