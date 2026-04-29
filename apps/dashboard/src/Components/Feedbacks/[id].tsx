import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Monitor,
  Globe,
  MapPin,
  Mail,
  Clock,
  Tag,
  AlertTriangle,
  Cpu,
  History,
  Users,
  MessageSquare,
} from "lucide-react";
import { useFeedbacks, useVisitorHistory } from "../../Hooks/useFeedback";
import LoadingPage from "../../Pages/LoadingPage";
import ErrorPage from "../../Pages/ErrorPage";
import FeedbackNotFound from "./FeedBackNotFound";
import { Chip } from "../../utils/chip";
import { parseBrowser } from "../../utils/parseBrowser";
import { categoryStyle, priorityStyle } from "../ui/styles";
import { MetaRow } from "./MetaRow";
import { VisitorHistoryPanel } from "./VisitorHistoryPanel";

export default function FeedbackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: feedbacks, isLoading, error } = useFeedbacks();
  const feedback = feedbacks?.find((f) => f._id === id);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;
  if (!feedback) return <FeedbackNotFound />;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-serif p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto space-y-4 md:space-y-6"
      >
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)] hover:text-[var(--amber)] transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={12} /> Back
        </button>

        {/* Title card */}
        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Chip
                label={feedback.category}
                cls={categoryStyle[feedback.category] ?? categoryStyle.other}
              />
              <Chip
                label={feedback.priority}
                cls={priorityStyle[feedback.priority] ?? priorityStyle.low}
              />
              {feedback.status && (
                <Chip
                  label={feedback.status}
                  cls="text-[var(--text-muted)] bg-[var(--bg-hover)] border-[var(--border)]"
                />
              )}
            </div>
            <span className="font-mono text-xs text-[var(--text-dim)]">
              {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text)] mb-3 leading-tight">
            {feedback.title}
          </h1>
          <p className="text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
            {feedback.description}
          </p>
        </div>

        {/* Submitter + Device */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-4">
              Submitted by
            </p>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
              <div className="w-9 h-9 bg-[var(--amber-bg)] border border-[var(--amber-border)] flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-xs font-bold text-[var(--amber)]">
                  {(feedback.name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm text-[var(--text)] truncate">
                  {feedback.name || "Anonymous"}
                </p>
                {feedback.userInfo?.email && (
                  <p className="font-mono text-xs text-[var(--text-dim)] truncate">
                    {feedback.userInfo.email}
                  </p>
                )}
              </div>
            </div>
            <MetaRow
              icon={<Mail size={12} />}
              label="Email"
              value={feedback.userInfo?.email}
            />
            <MetaRow
              icon={<MapPin size={12} />}
              label="Location"
              value={feedback.userInfo?.location}
            />
            <MetaRow
              icon={<Clock size={12} />}
              label="Submitted"
              value={new Date(feedback.createdAt).toLocaleString()}
            />
          </div>

          <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-4">
              Device & session
            </p>
            <MetaRow
              icon={<Monitor size={12} />}
              label="Browser"
              value={parseBrowser(feedback.userInfo?.browser)}
            />
            <MetaRow
              icon={<Cpu size={12} />}
              label="OS / Platform"
              value={feedback.userInfo?.os}
            />
            <MetaRow
              icon={<Globe size={12} />}
              label="IP address"
              value={feedback.userInfo?.ip}
            />
            <MetaRow
              icon={<Tag size={12} />}
              label="Site ID"
              value={feedback.siteId}
            />
            <MetaRow
              icon={<Users size={12} />}
              label="Visitor ID"
              value={feedback.visitorId}
            />
          </div>
        </div>

        {feedback.visitorId && (
          <VisitorHistoryPanel
            visitorId={feedback.visitorId}
            feedbackId={feedback._id}
          />
        )}

        {/* Raw user agent */}
        {feedback.userInfo?.browser && (
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-3">
              User agent
            </p>
            <p className="font-mono text-xs text-[var(--text-muted)] break-all leading-relaxed">
              {feedback.userInfo.browser}
            </p>
          </div>
        )}

        {/* Tags */}
        {feedback.tags && feedback.tags.length > 0 && (
          <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-5">
            <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-widest mb-3">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {feedback.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 border border-[var(--border)] text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
