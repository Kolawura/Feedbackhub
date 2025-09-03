import { ButtonHTMLAttributes, ReactNode } from "react";

export type SidebarProps = {
  isCollapsed: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
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

export type WidgetConfig = {
  buttonText: string;
  color: string;
  position: "right" | "left";
  theme: "light" | "dark";
};

export interface Feedback {
  id: string;
  title: string;
  description: string;
  category: "bug" | "feature" | "improvement" | "other";
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "resolved" | "closed";
  sender: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  votes: number;
  tags: string[];
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
export interface Site {
  siteId: string;
  name: string;
}
