import { ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Feedback } from "../../Type";

export const FeedbackItem: React.FC<{
  feedback: Feedback | null;
  getStatusIcon: (status: string) => React.ReactNode;
  getPriorityColor: (priority: string) => string;
  getCategoryColor: (category: string) => string;
}> = ({ feedback, getStatusIcon, getPriorityColor, getCategoryColor }) => {
  if (feedback)
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* <Avatar className="h-12 w-12">
            <AvatarImage src={feedback.sender.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {feedback.sender.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar> */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{feedback.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {feedback.sender.name} ({feedback.sender.email})
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(feedback.status)}
                  <Badge variant={getPriorityColor(feedback.priority) as any}>
                    {feedback.priority}
                  </Badge>
                  <Badge variant={getCategoryColor(feedback.category) as any}>
                    {feedback.category}
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground">{feedback.description}</p>

              <div className="flex flex-wrap gap-2">
                {feedback.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>
                    Created: {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Updated: {new Date(feedback.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{feedback.votes}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="text-sm border-gray-300 dark:border-gray-700 dark:hover:bg-gray-950 bg-gray-50 dark:bg-gray-900"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm border-gray-300 dark:border-gray-700 dark:hover:bg-gray-950 bg-gray-50 dark:bg-gray-900"
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
};
