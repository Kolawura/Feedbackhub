import { ButtonHTMLAttributes, ReactNode } from "react";

export type SidebarProps = {
  isCollapsed: boolean;
  // handleMouseEnter: () => void;
  // handleMouseLeave: () => void;
  Expand: boolean;
};

export type NavbarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  Expand?: boolean;
  className: string;
  NavWidth?: string;
};

export type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export interface Feedback {
  _id: string;
  siteId: string;
  title: string;
  description: string;
  name: string;
  category: "bug" | "feature" | "improvement" | "other";
  priority: "low" | "medium" | "high" | "critical";
  status?: "open" | "in-progress" | "resolved" | "closed";
  userInfo: {
    browser: string;
    os: string;
    ip: string;
    location: string;
    email: string;
  };
  visitorId: string;
  createdAt: string;
  updatedAt: string;
  votes?: number;
  tags?: string[];
}

export interface AnalyticsData {
  totalFeedback: number;
  openFeedback: number;
  resolvedFeedback: number;
  averageResolutionTime: number;
  feedbackByCategory: { category: string; count: number }[];
  feedbackByPriority: { priority: string; count: number }[];
  feedbackTrend: { date: string; count: number }[];
  topSenders: { name: string; email: string; count: number }[];
}
export interface WidgetConfig {
  buttonText: string;
  buttonColor: string;
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme: "light" | "dark" | "auto";
}

export interface Site {
  siteId: string;
  name: string;
  widgetConfig?: WidgetConfig;
}

export interface VisitorSession {
  _id: string;
  siteId: string;
  sessionId?: string;
  visitTimestamp: string;
  sessionStart: string;
  page: string;
  country?: string;
  city?: string;
  region?: string;
  userInfo?: {
    userAgent?: string;
    language?: string;
    platform?: string;
    screenWidth?: number;
  };
  pagesVisited: {
    _id: string;
    url: string;
    timestamp: string;
  }[];
}

export type Status = "verifying" | "success" | "error";

export interface VisitorSummary {
  visitorId: string;
  siteId: string;
  firstSeen: string;
  lastSeen: string;
  country?: string;
  city?: string;
  region?: string;
  userAgent?: string;
  platform?: string;
  language?: string;
  screenWidth?: number;
  sessionCount: number;
  totalPageViews: number;
  feedbackCount: number;
  entryPage?: string;
}

export interface PageVisitDetail {
  url: string;
  timestamp: string;
  durationSeconds: number | null;
  durationLabel: string;
  isEntryPage: boolean;
  isExitPage: boolean;
}

export interface SessionDetail {
  _id: string;
  sessionId?: string;
  visitTimestamp: string;
  sessionStart: string;
  country?: string;
  city?: string;
  region?: string;
  userInfo?: {
    userAgent?: string;
    language?: string;
    platform?: string;
    screenWidth?: number;
  };
  totalPages: number;
  sessionDurationSeconds: number;
  sessionDurationLabel: string;
  pagesVisited: PageVisitDetail[];
  feedbackSubmittedCount: number;
}

export interface VisitorDetail {
  visitorId: string;
  firstSeen: string;
  lastSeen: string;
  country?: string;
  city?: string;
  region?: string;
  userInfo?: {
    userAgent?: string;
    language?: string;
    platform?: string;
    screenWidth?: number;
  };
  totalSessions: number;
  totalPageViews: number;
  totalFeedback: number;
  avgSessionDuration: number;
  avgSessionDurationLabel: string;
  topPages: { url: string; visits: number }[];
  sessions: SessionDetail[];
  feedback: any[];
}
