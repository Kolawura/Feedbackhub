"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useFeedbackStore } from "../Store/useFeedbackStore";
import { FilterControls } from "../Components/Feedbacks/FilterControls";
import { FeedbackItem } from "../Components/Feedbacks/FeedbackItem";
import LoadingPage from "./LoadingPage";
import toast from "react-hot-toast";
import { useSiteIdStore } from "../Store/useSiteIdStore";
import ErrorPage from "./ErrorPage";
import NoFeedbacks from "../Components/Feedbacks/NoFeedbacks";

const Feedback: React.FC = () => {
  const { feedbacks, loading, error, fetchFeedbacks } = useFeedbackStore();

  const { siteIds, selectedSiteId, selectSiteId } = useSiteIdStore();

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredFeedback = feedbacks?.filter((feedback) => {
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
  if (error) toast.error(error);
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error} />;
  // if (feedbacks.length === 0) return <NoFeedbacks />;

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
        siteIds={siteIds}
        selectedSiteId={selectedSiteId}
        selectSiteId={selectSiteId}
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
