import { useState } from "react";
import { useFeedbacks } from "./useFeedback";
import { useSites } from "./useSite";
import { useSiteStore } from "../Store/useSiteStore";
export const useFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriority] = useState("all");
  const [categoryFilter, setCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { selectedSiteId, selectSiteId } = useSiteStore();
  const {
    data: feedbacks,
    isLoading,
    error,
  } = useFeedbacks(selectedSiteId ?? undefined);
  const { data: sites } = useSites().sitesQuery;
  const filtered = feedbacks?.filter((fb) => {
    const q = searchTerm.toLowerCase();
    return (
      (!q ||
        fb.title.toLowerCase().includes(q) ||
        fb.description?.toLowerCase().includes(q) ||
        fb.name?.toLowerCase().includes(q)) &&
      (priorityFilter === "all" || fb.priority === priorityFilter) &&
      (categoryFilter === "all" || fb.category === categoryFilter)
    );
  });

  const hasFilters =
    searchTerm ||
    priorityFilter !== "all" ||
    categoryFilter !== "all" ||
    selectedSiteId;

  return {
    filtered,
    hasFilters,
    isLoading,
    error,
    setSearchTerm,
    setPriority,
    setCategory,
    showFilters,
    setShowFilters,
    sites,
    selectSiteId,
    selectedSiteId,
    searchTerm,
    priorityFilter,
    categoryFilter,
  };
};
