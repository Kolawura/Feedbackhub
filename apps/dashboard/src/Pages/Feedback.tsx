import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Feedback } from "../Type";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import toast from "react-hot-toast";
import { useFilter } from "../Hooks/useFilter";
import {
  categoryDot,
  categoryStyle,
  priorityStyle,
  selectClass,
} from "../Components/ui/styles";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const {
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
  } = useFilter();

  if (error) toast.error(error.message);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-5 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-mono text-xs text-[var(--amber)] tracking-[0.3em] uppercase mb-1">
          Inbox
        </p>
        <div className="flex items-end justify-between">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[var(--text)]">
            Feedback
          </h1>
          <span className="font-mono text-xs text-[var(--text-dim)]">
            {filtered?.length ?? 0} items
          </span>
        </div>
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2">
            <Search
              size={12}
              className="text-[var(--text-dim)] flex-shrink-0"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search feedback..."
              className="flex-1 bg-transparent font-mono text-xs text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none min-w-0"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-[var(--text-dim)] hover:text-[var(--text-muted)]"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 border font-mono text-xs transition-colors flex-shrink-0 ${
              showFilters
                ? "border-[var(--amber)] text-[var(--amber)] bg-[var(--amber-bg)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-light)]"
            }`}
          >
            <SlidersHorizontal size={12} />
            <span className="hidden sm:inline">Filters</span>
            {hasFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--amber)]" />
            )}
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedSiteId ?? "all"}
              onChange={(e) =>
                selectSiteId(e.target.value === "all" ? null : e.target.value)
              }
              className={selectClass}
            >
              <option value="all">All sites</option>
              {sites?.map((s) => (
                <option key={s.siteId} value={s.siteId}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategory(e.target.value)}
              className={selectClass}
            >
              <option value="all">All categories</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="improvement">Improvement</option>
              <option value="other">Other</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriority(e.target.value)}
              className={selectClass}
            >
              <option value="all">All priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {hasFilters && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setPriority("all");
                  setCategory("all");
                  selectSiteId(null);
                }}
                className="font-mono text-xs text-[var(--red)] hover:opacity-70 px-2 transition-opacity"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* List */}
      <div className="border border-[var(--border)] bg-[var(--bg-surface)] divide-y divide-[var(--border)]">
        {filtered?.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest">
              No results
            </p>
          </div>
        ) : (
          filtered?.map((fb: Feedback, i) => (
            <motion.div
              key={fb._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.025 }}
              onClick={() => navigate(`/feedback/${fb._id}`)}
              className="p-3 md:p-5 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${categoryDot[fb.category] ?? "bg-[var(--text-dim)]"}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-mono text-sm text-[var(--text)] group-hover:text-[var(--amber)] transition-colors truncate">
                      {fb.title}
                    </h3>
                    <span className="font-mono text-xs text-[var(--text-dim)] flex-shrink-0 hidden sm:block">
                      {new Date(fb.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-2 line-clamp-1">
                    {fb.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-[var(--text-dim)]">
                      {fb.name || "Anonymous"}
                    </span>
                    {fb.userInfo?.location && (
                      <span className="font-mono text-xs text-[var(--text-dim)] hidden md:inline">
                        · {fb.userInfo.location}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5 ml-auto">
                      <span
                        className={`font-mono text-xs px-2 py-0.5 border ${categoryStyle[fb.category] ?? categoryStyle.other}`}
                      >
                        {fb.category}
                      </span>
                      <span
                        className={`font-mono text-xs px-2 py-0.5 border ${priorityStyle[fb.priority] ?? priorityStyle.low}`}
                      >
                        {fb.priority}
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="text-[var(--text-dim)] group-hover:text-[var(--amber)] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
