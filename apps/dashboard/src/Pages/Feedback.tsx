"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/Card";
import { Badge } from "../Components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/Avatar";
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/Select";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { mockFeedback } from "../data/mockData";

const FilterControls: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  onClearFilters: () => void;
}> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  onClearFilters,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Filter className="h-5 w-5" />
        Filters
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="bug">Bug</SelectItem>
            <SelectItem value="feature">Feature</SelectItem>
            <SelectItem value="improvement">Improvement</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="border-gray-300 dark:border-gray-700 dark:hover:bg-gray-950 bg-gray-50 dark:bg-gray-900"
        >
          Clear Filters
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Feedback Item Component
const FeedbackItem: React.FC<{
  feedback: (typeof mockFeedback)[0];
  getStatusIcon: (status: string) => React.ReactNode;
  getPriorityColor: (priority: string) => string;
  getCategoryColor: (category: string) => string;
}> = ({ feedback, getStatusIcon, getPriorityColor, getCategoryColor }) => (
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

// Main Feedback Component
const Feedback: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredFeedback = mockFeedback.filter((feedback) => {
    const matchesSearch =
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || feedback.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || feedback.priority === priorityFilter;
    const matchesCategory =
      categoryFilter === "all" || feedback.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "bug":
        return "destructive";
      case "feature":
        return "default";
      case "improvement":
        return "secondary";
      case "other":
        return "outline";
      default:
        return "default";
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setCategoryFilter("all");
  };

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100 transition-all duration-200">
      <div>
        <h1 className="text-3xl font-bold">Feedback Management</h1>
        <p className="text-muted-foreground">
          View and manage all feedback submissions
        </p>
      </div>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onClearFilters={handleClearFilters}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredFeedback.length} feedback items
          </h2>
        </div>

        {filteredFeedback.map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            feedback={feedback}
            getStatusIcon={getStatusIcon}
            getPriorityColor={getPriorityColor}
            getCategoryColor={getCategoryColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
