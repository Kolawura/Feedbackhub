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

export const mockFeedback: Feedback[] = [
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
  {
    id: "3",
    title: "Export functionality needed",
    description:
      "Users should be able to export their data in CSV or PDF format.",
    category: "feature",
    priority: "low",
    status: "open",
    sender: {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-13T16:45:00Z",
    votes: 5,
    tags: ["export", "data"],
  },
  {
    id: "4",
    title: "Mobile app crashes on startup",
    description:
      "The mobile application crashes immediately after opening on Android devices.",
    category: "bug",
    priority: "critical",
    status: "resolved",
    sender: {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-17T13:30:00Z",
    votes: 15,
    tags: ["mobile", "android", "crash"],
  },
  {
    id: "5",
    title: "Improve search functionality",
    description:
      "The current search is not very accurate and could use better filtering options.",
    category: "improvement",
    priority: "medium",
    status: "open",
    sender: {
      id: "5",
      name: "David Brown",
      email: "david@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: "2024-01-11T09:10:00Z",
    updatedAt: "2024-01-11T09:10:00Z",
    votes: 7,
    tags: ["search", "filtering"],
  },
];

export const mockAnalytics: AnalyticsData = {
  totalFeedback: 47,
  openFeedback: 23,
  resolvedFeedback: 18,
  averageResolutionTime: 4.2,
  feedbackByCategory: [
    { category: "bug", count: 15 },
    { category: "feature", count: 18 },
    { category: "improvement", count: 10 },
    { category: "other", count: 4 },
  ],
  feedbackByPriority: [
    { priority: "critical", count: 3 },
    { priority: "high", count: 8 },
    { priority: "medium", count: 22 },
    { priority: "low", count: 14 },
  ],
  feedbackTrend: [
    { date: "2024-01-01", count: 2 },
    { date: "2024-01-02", count: 4 },
    { date: "2024-01-03", count: 3 },
    { date: "2024-01-04", count: 6 },
    { date: "2024-01-05", count: 5 },
    { date: "2024-01-06", count: 8 },
    { date: "2024-01-07", count: 7 },
  ],
  topSenders: [
    { name: "John Doe", email: "john@example.com", count: 5 },
    { name: "Jane Smith", email: "jane@example.com", count: 4 },
    { name: "Mike Johnson", email: "mike@example.com", count: 3 },
    { name: "Sarah Wilson", email: "sarah@example.com", count: 3 },
  ],
};
